export async function GET() {
    const events = [
        {id: 0, title: "Concert de Jazz", date: "2024-04-15", location: "Paris"},
        {id: 1, title: "Festival de Rock", date: "2024-05-20", location: "Lyon"},
        {id: 2, title: "Soirée Electro", date: "2024-06-10", location: "Marseille"}
    ];

    return Response.json(events);
}