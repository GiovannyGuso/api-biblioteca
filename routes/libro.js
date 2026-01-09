const express = require("express");
const router = express.Router();
const Libro = require("../models/libro");
const Autor = require("../models/autor");
const Genero = require("../models/genero");

router.get("/", async (req, res) => {
  try {
    const libros = await Libro.findAll({
      include: [
        {
          model: Autor,
          as: "autor",
          attributes: ["id", "nombre", "nacionalidad"],
        },
        {
          model: Genero,
          as: "genero",
          attributes: ["id", "nombre", "descripcion"],
        },
      ],
    });
    res.json(libros);
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({"mensaje":"No se pudo obtener"});
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const libro = await Libro.findOne({
      where: { id },
      include: [
        {
          model: Autor,
          as: "autor",
          attributes: ["id", "nombre", "nacionalidad"],
        },
        {
          model: Genero,
          as: "genero",
          attributes: ["id", "nombre", "descripcion"],
        },
      ],
    });
    res.json(libro);
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({"mensaje":"No se pudo obtener"});
  }
});

router.get("/autor/:id_autor", async (req, res) => {
  try {
    const { id_autor } =  req.params;
    const libros = await Libro.findAll({
      where:{id_autor}
    });
    if (libros.length == 0) {
      return res.status(404).json({"mensaje":"No se encontros"});
    }
    res.json(libros);
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({"mensaje":"No se pudo obtener"});
  }
});

router.get("/genero/:id_genero", async (req, res) => {
  try {
    const { id_genero } =  req.params;
    const libros = await Libro.findAll({
      where:{id_genero}
    });
    if (libros.length == 0) {
      return res.status(404).json({"mensaje":"No se encontros"});
    }
    res.json(libros);
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({"mensaje":"No se pudo obtener"});
  }
});

router.post("/",async (req, res) =>{
    try {
        const { titulo, editorial, id_autor, id_genero } = req.body;
        const autor = await Autor.findByPk(id_autor);
        if (!autor) res.status(404).json({"mensaje":"No existe la clave foranea id_autor"});

        const genero = await Genero.findByPk(id_genero);
        if (!genero) res.status(404).json({"mensaje":"No existe la clave foranea id_genero"});

        const libro = await Libro.create({ titulo, editorial, id_autor, id_genero });
        res.status(201).json(libro);
    } catch (error) {
        console.log("Error: "+error);
        res.status(500).json({"mensaje":"Error al crear libro"});
    }
});

router.put("/:id",async (req, res) =>{
    try {
        const { id } = req.params;
        const libro = await Libro.findByPk(id);
        if (!libro) res.status(404).json({"mensaje":"No existe el libro, verifique el id del mismo"});

        const { titulo, editorial, id_autor, id_genero }= req.body;

        const autor = await Autor.findByPk(id_autor);
        if (!autor) res.status(404).json({"mensaje":"No existe la clave foranea id_autor"});

        const genero = await Genero.findByPk(id_genero);
        if (!genero) res.status(404).json({"mensaje":"No existe la clave foranea id_genero"});

        await libro.update({ titulo, editorial, id_autor, id_genero });

        res.status(200).json(libro);
    } catch (error) {
        console.log("Error: "+error);
        res.status(500).json({"mensaje":"Error al acualizar autor"});
    }
});

router.delete("/:id",async (req, res) =>{
    try {
        const { id } = req.params;
        const libro = await Libro.findByPk(id);
        await libro.destroy();
        res.status(200).json({"mensaje":`El Libro con el id ${id} fue eliminado correctamente`});
    } catch (error) {
        console.log("Error: "+error);
        res.status(500).json({"mensaje":"Error al eliminar libro"});
    }
});

module.exports = router;