export async function GET() {
    return Response.json({hi: Math.random()*10})
}