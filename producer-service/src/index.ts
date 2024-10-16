import { Hono } from 'hono'
import { kafka, startServices } from './start.services'

const app = new Hono()

startServices()

app.post('/produce', async(c) => {
  const {message}=await c.req.json()
  if(!message){
    return c.json({message:"Required"})
  }
  try {
    await kafka.produceMessages("test-topic",[{value:message}])
    return c.json({sucess:true,message:"Message sent successfully"},200)
  } catch (error) {
    return c.json({message:"Error"},500)
  }
})

export default app
