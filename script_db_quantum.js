require ('dotenv').config({quiet:true})

const DATABASE_URL = ProcessingInstruction.env.DATABASE_URL

const host = new URL (DATABASE_URL).host

const neonHttpEndpoint = `https://${host}/sql`

async function executarQueryNeon(querySQL, parametros) 
{
    try {
    const resposta = await fetch(neonHttpEndpoint, 
    {
    method:'POST',
    headers:{
        'Neon-Connection-String':DATABASE_URL,
        'Content-Type': 'application/json'
    },
    body:JSON.stringify()
    {

    })
    }
)
    }
    catch{

    }
}







}

module.exports = {executarQueryNeon}