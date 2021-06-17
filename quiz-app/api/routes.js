const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const Question = require('./models/Question') // includes Questions.js file

// grab quiz ?s
router.get('/questions', async (req, res) =>
{
    try
    {
        const questions = await Question.find();
        return res.status(200).json(questions);
    } catch (error)
    {
        return res.status(500).json({"error":error});
    }
})

// get one quiz ?
router.get('/questions/:id', async (req, res) =>
{
    try
    {
        const _id = req.params.id;
        const question = await Question.findOne({_id});
        if(!question) { return res.status(404).json({})}
        else {return res.status(200).json(question)}
    } catch (error) { return res.status(500).json({"error":error})}
})
//create one quiz ?
router.post('/questions', async (req, res) =>
{
    try
    {
        const { description } = req.body;
        const { alternatives } = req.body;

        const question = await Question.create(
            {
                description,
                alternatives
            }
        )
        return res.status(201).json(question)
    } catch (error)
    {
        return res.status(500).json({"error":error});
    }
})
//update one quiz ?
router.put('/questions/:id', async (req, res) =>
{
    try
    {
        const _id = req.params.id;
        const { description, alternative } = req.body;

        let question = await Question.findOne({_id})

        if(!question)
        {
            question = await Question.create
            (
                {
                    description,
                    alternatives
                }
            ); return res.status(201).json(question)
        } else
        {
            question.description = description;
            question.alternatives = alternatives;
            await question.save();
            return res.status(200).json(question);
        }
    } catch (error)
    {
        return res.status(500).json({"error":error})
    }
})
//delete one quiz ?
router.delete('/questions/:id', async (req, res) =>
{
    try
    {
        const _id = rew.params.id;
        const question = await Question.deleteOne({_id})
        if(question.deletedCount === 0)
        {
            return res.status(404).json()
        } else
        {
            return res.status(204).json()
        }
    } catch (error)
    {
        return res.status(500).json({"error":error})
    }
})

router.get('/', (req, res) =>
{
    res.send('Howdy! :]')
})

module.exports = router;