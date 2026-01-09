const express = require("express");
const router = express.Router();
const Libro = require("../models/libro")
const Autor = require("../models/autor")
const Genero = require("../models/genero")

//GET para obetenr todos los libros
router.get("/", async (req, res)=>{
    try{
        const libros = await Libro.findAll({
            include: [
                {
                    model: Autor,
                    as: 'autor',
                    attributes: ['id', 'nombre', 'nacionalidad']
                },
                {
                    model: Genero,
                    as: 'genero',
                    attributes: ['id', 'nombre', 'descripcion']
                }
            ]
        });
        res.json(libros);
    } catch (error){
        console.log("Error: "+error)
        res.status(500).json({"mensaje": "Error al obtener"})
    }
})

//GET para obtener un libro por id
router.get("/:id", async (req, res)=>{
    try{
        const { id } = req.params;
        const libro = await Libro.findOne({
            where: { id },
            include: [
                {
                    model: Autor,
                    as: 'autor',
                    attributes: ['id', 'nombre', 'nacionalidad']
                },
                {
                    model: Genero,
                    as: 'genero',
                    attributes: ['id', 'nombre', 'descripcion']
                }
            ]
        });
        if (!libro){
            res.status(404).json({"mensaje": "No se encontro"})
        }
        res.json(libro);
    } catch (error){
        console.log("Error: "+error)
        res.status(500).json({"mensaje": "Error al obtener"})
    }
})

// GET para obtener los libros de un autor especifico
router.get("/autor/:id_autor", async (req, res)=>{
    try{
        const { id_autor } = req.params;
        const libros = await Libro.findAll({
            where: {id_autor}
        });
        if(!libros.length) return res.status(404).json({"mensaje":"No se pudo obtener"})
        res.json(libros)
    }catch(e){
        console.log("Error: "+error)
        res.status(500).json({"mensaje": "Error al obtener"})
    }
});

// GET para obtener los libros de un genero especifico
router.get("/genero/:id_genero", async (req, res)=>{
    try{
        const { id_genero } = req.params;
        const libros = await Libro.findAll({
            where: {id_genero}
        });
        if(!libros.length) return res.status(404).json({"mensaje":"No se pudo obtener"})
        res.json(libros)
    }catch(e){
        console.log("Error: "+error)
        res.status(500).json({"mensaje": "Error al obtener"})
    }
});

//POST para crear un nuevo libro
router.post("/", async (req, res)=>{
    try{
        const { titulo, editorial, id_autor, id_genero } = req.body;

        const autor = await Autor.findByPk(id_autor);
        if(!autor) res.status(404).json({
            "mensaje": "No existe la clave foranea id_autor"
        });

        const genero = await Genero.findByPk(id_genero);
        if(!genero) res.status(404).json({
            "mensaje": "No existe la clave foranea id_genero"
        });

        const libro = await Libro.create({titulo, editorial, id_autor, id_genero});
        res.status(201).json(libro);
    } catch (error){
        console.log("Error: "+error)
        res.status(500).json({"mensaje": "Error al obtener"})
    }
})

//PUT para actualizar un libro por id
router.put("/:id", async (req, res)=>{
    try{
        const { id } = req.params
        const { titulo, editorial, id_autor, id_genero } = req.body;

        const libro = await Libro.findByPk(id);
        if(!libro) res.status(404).json({
            "mensaje": "No existe el libro"
        });

        const autor = await Autor.findByPk(id_autor);
        if(!autor) res.status(404).json({
            "mensaje": "No existe la clave foranea id_autor"
        });

        const genero = await Genero.findByPk(id_genero);
        if(!genero) res.status(404).json({
            "mensaje": "No existe la clave foranea id_genero"
        });

        await libro.update({titulo, editorial, id_autor, id_genero});
        res.json(libro);
        if (!libro){
            res.status(404).json({"mensaje": "No se encontro"})
        }
        res.json(libro);
    } catch (error){
        console.log("Error: "+error)
        res.status(500).json({"mensaje": "Error al obtener"})
    }
})

//DELETE para eliminar un libro por id
router.delete("/:id", async (req, res)=>{
    try{
        const { id } = req.params;
        const libro = await Libro.findByPk(id);
        await libro.destroy();
        res.json(libro);
        if (!libro){
            res.status(404).json({"mensaje": "No se encontro"})
        }
        res.json({"mensaje": `El libro con el id ${id} fue eliminado.`});
    } catch (error){
        console.log("Error: "+error)
        res.status(500).json({"mensaje": "Error al obtener"})
    }
})

module.exports = router;