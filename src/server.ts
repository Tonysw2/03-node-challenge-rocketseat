import { app } from './app'
import { env } from './env'

app.listen(
  {
    port: env.PORT,
  },
  (error) => {
    if (error) {
      console.error(error)
      process.exit(1)
    }

    console.log(`Server running on port ${env.PORT} 🔥`)
  },
)
