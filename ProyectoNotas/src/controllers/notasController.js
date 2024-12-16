import fs from 'fs';
import path from 'path';
import logger from '../utils/logger.js';
import { fileURLToPath } from 'url';
import multer from 'multer';
import archiver from 'archiver';

// Obtener el directorio actual
const __dirname = path.dirname(__filename);

// Definir la ruta a la carpeta de notas
const notesDir = path.join(__dirname, '..', 'notes');

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, notesDir); // Guardar los archivos en la carpeta 'notes'
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Usar el nombre original del archivo
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.endsWith('.note')) {
      return cb(new Error('Solo se permiten archivos .note'), false); // Filtrar solo archivos .note
    }
    cb(null, true);
  },
});

// Obtener todas las notas
export const getNotes = (req, res, next) => {
  fs.readdir(notesDir, (err, files) => {
    if (err) {
      logger.error(`Error al leer las notas: ${err}`);
      return next(err);
    }
    const notes = files.filter(file => file.endsWith('.note')).map(file => file.replace('.note', ''));

    // Aplicar filtros
    const { filter } = req.query;
    let filteredNotes = notes;

    // Filtro por título
    if (filter && filter.title) {
      filteredNotes = filteredNotes.filter(note => note.includes(filter.title));
    }

    // Filtro por fecha de creación
    if (filter && filter.dateRange) {
      const { startDate, endDate } = filter.dateRange;
      const start = new Date(startDate);
      const end = new Date(endDate);

      filteredNotes = filteredNotes.filter(note => {
        const stats = fs.statSync(path.join(notesDir, `${note}.note`));
        const creationDate = new Date(stats.birthtime);
        return creationDate >= start && creationDate <= end;
      });
    }

    // Paginación
    const pageSize = parseInt(req.query.pageSize) || 10;
    const totalNotes = filteredNotes.length;
    const totalPages = Math.ceil(totalNotes / pageSize);
    const page = parseInt(req.query.page) || 1;

    const paginatedNotes = filteredNotes.slice((page - 1) * pageSize, page * pageSize);

    res.json({
      notes: paginatedNotes,
      totalNotes,
      totalPages,
      currentPage: page,
      pageSize,
    });
  });
};

// Crear una nueva nota
export const createNote = (req, res) => {
  
  const name = req.params.name;

  const content = req.body.content;

  if (!name || !content) {
    return res.status(400).json({ error: 'Nombre y contenido son requeridos' });
  }

  const filePath = path.join(notesDir, `${name}.note`);
  fs.writeFile(filePath, content, err => {
    if (err) {
      logger.error(`Error al guardar la nota: ${err}`);
      return next(err);
    }
    res.status(201).json({ message: 'Nota creada con éxito' });
  });
};

// Listar Notas
export const listarNotas = (req, res) => {
    const { query } = parse(req.url, true);
    const {
      ordenarPor = 'titulo',
      orden = 'asc',
      filtroTitulo = '',
      filtroContenido = '',
      fechaInicio,
      fechaFin,
      fechaCampo = 'created', // Puede ser 'created' o 'modified'
      pagina = 1,
      elementosPorPagina = 10
    } = query;
  
    let notas = fs.readdirSync(dataFolder)
      .filter(file => file.endsWith('.note'))
      .map(file => {
        const filePath = path.join(dataFolder, file);
        const metadata = getMetadata(filePath);
        const content = fs.readFileSync(filePath, 'utf8');
        return {
          titulo: file.replace('.note', ''),
          contenido: content,
          ...metadata
        };
      });
  
    // Filtro por título
    if (filtroTitulo) {
      notas = notas.filter(nota => nota.titulo.toLowerCase().includes(filtroTitulo.toLowerCase()));
    }
  
    // Filtro por contenido
    if (filtroContenido) {
      notas = notas.filter(nota => nota.contenido.toLowerCase().includes(filtroContenido.toLowerCase()));
    }
  
    // Filtro por rango de fechas (creación o modificación)
    if (fechaInicio || fechaFin) {
      const inicio = fechaInicio ? new Date(fechaInicio) : new Date(0); // Desde el inicio del tiempo si no se especifica
      const fin = fechaFin ? new Date(fechaFin) : new Date(); // Hasta ahora si no se especifica
      notas = notas.filter(nota => {
        const fecha = new Date(nota[fechaCampo]); // Usar 'created' o 'modified'
        return fecha >= inicio && fecha <= fin;
      });
    }
  
    // Ordenar notas
    notas.sort((a, b) => {
      let comparison = 0;
      if (ordenarPor === 'titulo') {
        comparison = a.titulo.localeCompare(b.titulo);
      } else if (ordenarPor === 'created') {
        comparison = new Date(a.created) - new Date(b.created);
      } else if (ordenarPor === 'modified') {
        comparison = new Date(a.modified) - new Date(b.modified);
      } else if (ordenarPor === 'size') {
        comparison = a.size - b.size;
      }
      return orden === 'asc' ? comparison : -comparison;
    });
  
    // Paginación
    const totalElementos = notas.length;
    const totalPaginas = Math.ceil(totalElementos / elementosPorPagina);
    const paginaActual = Math.max(1, Math.min(parseInt(pagina, 10), totalPaginas));
    const inicio = (paginaActual - 1) * elementosPorPagina;
    const notasPaginadas = notas.slice(inicio, inicio + parseInt(elementosPorPagina, 10));
  
    res.json({
      totalElementos,
      totalPaginas,
      paginaActual,
      notas: notasPaginadas
    });
  };


// Actualizar una nota existente
export const updateNote = (req, res) => {
  const name = req.params.name;
  const content = req.body.content;

  if (!content) {
    return res.status(400).json({ error: 'Contenido es requerido' });
  }

  const filePath = path.join(notesDir, `${name}.note`);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err){
      return res.status(404).json({ error: 'Nota no encontrada' });
    
    }
    const updateContent = data + '\n' + content;
    fs.writeFile(filePath, updateContent, (err) => {
      if(err) {
        return res.status(500).json({ error: 'Error al actualizar la nota' });
      }
      res.status(200).send({ message: 'Nota actualizada con éxito' });
    });
  });

};



// Eliminar una nota
export const deleteNote = (req, res, next) => {
  const { name } = req.params;
  const filePath = path.join(notesDir, `${name}.note`);

  fs.unlink(filePath, err => {
    if (err) return next(err);
    res.json({ message: 'Nota eliminada con éxito' });
  });
};

// Subir una o varias notas .note
export const uploadNotes = (req, res, next) => {
  const files = req.files;
  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'No se han subido archivos' });
  }

  // Verificar si los archivos ya existen
  files.forEach(file => {
    const filePath = path.join(notesDir, file.originalname);
    if (fs.existsSync(filePath)) {
      return res.status(400).json({ error: `El archivo ${file.originalname} ya existe` });
    }
  });

  res.status(200).json({
    message: `${files.length} archivos subidos con éxito`,
    files: files.map(file => file.originalname),
  });
};

// Exportar notas seleccionadas como un archivo ZIP
export const exportNotes = (req, res, next) => {
  const { filenames, title, startDate, endDate } = req.query;
  const files = filenames ? filenames.split(',') : [];

  if (files.length === 0) {
    return res.status(400).json({ error: 'No se especificaron archivos para exportar' });
  }

  // Filtros de exportación
  let filteredFiles = files;

  // Filtro por título
  if (title) {
    filteredFiles = filteredFiles.filter(file => file.includes(title));
  }

  // Filtro por rango de fechas
  if (startDate || endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    filteredFiles = filteredFiles.filter(file => {
      const stats = fs.statSync(path.join(notesDir, `${file}.note`));
      const creationDate = new Date(stats.birthtime);
      return (!startDate || creationDate >= start) && (!endDate || creationDate <= end);
    });
  }

  // Verificar que los archivos existen
  const filePaths = filteredFiles.map(file => path.join(notesDir, `${file}.note`));
  const nonExistentFiles = filePaths.filter(filePath => !fs.existsSync(filePath));

  if (nonExistentFiles.length > 0) {
    return res.status(404).json({ error: `Los archivos no existen: ${nonExistentFiles.join(', ')}` });
  }

  // Comprimir los archivos seleccionados
  const archive = archiver('zip', { zlib: { level: 9 } });
  res.attachment('notes.zip');

  archive.pipe(res);

  filePaths.forEach(filePath => {
    archive.file(filePath, { name: path.basename(filePath) });
  });

  archive.finalize();
};
