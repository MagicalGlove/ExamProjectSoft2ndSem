import express, {Request, Response} from "express";
import { AppDataSource } from "./ormconfig.ts";
import cors from "cors";
import { validateCredentials } from "./loginService/userRepository.ts";
const app = express();

app.use(cors());
app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!"); // eslint-disable-line no-console

        app.post("/login", async (req: Request, res: Response) => {
            try {
                const { username, password } = req.body;
                
                const user = await validateCredentials(username, password);
                
                if (!user) {
                    res.status(401).json({ error: "Invalid username or password" });
                    return ;
                }

                res.json(user);
            } catch (error) {
                console.error("Error finding user:", error); // eslint-disable-line no-console
                res.status(500).json({ error: "Error finding user" });
            }
        });
        
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err); // eslint-disable-line no-console
    });

export default app;