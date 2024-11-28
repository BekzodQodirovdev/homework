import express from "express"
import morgan from "morgan"
import {
    teacherRouter,
    userRouter,
    studentRouter,
    coursesRouter,
    assignmentRouter,
    googleRouter,
    lessonRouter,
    homeworkRouter,
    examRouter,
} from "./router/index.js"

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

app.use("/api/v1", googleRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/teacher", teacherRouter)
app.use("/api/v1/student", studentRouter)
app.use("/api/v1/courses", coursesRouter)
app.use("/api/v1/assignment", assignmentRouter)
app.use("/api/v1/lesson", lessonRouter)
app.use("/api/v1/homework", homeworkRouter)
app.use("/api/v1/exam", examRouter)

app.use((err, req, res) => {
    if (err) {
        return res.send(err.message)
    }
    return res.send("not found")
})
