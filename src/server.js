import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import { gerarPerguntas } from "./generateQuestions.js"

const nomeArq = fileURLToPath(import.meta.url)
const diret = path.dirname(nomeArq)

const app = express()
app.use(cors())
app.use(express.json())

app.use(express.static(path.resolve(diret, "..")))

app.post("/api/gerar-perguntas", async(req, res) => {
    try {
        const { tema, quantidade, dificuldade } = req.body
        const perguntas = await gerarPerguntas(tema, quantidade, dificuldade)
        res.json(perguntas)
    } catch (erro) {
        console.log(erro)
        res.status(500).json({ error: "Erro ao gerar perguntas."})
    }
})

const PORTA = process.env.PORTA || 3000
app.listen(PORTA, () => console.log(`Servidor rodando na porta ${PORTA}`))