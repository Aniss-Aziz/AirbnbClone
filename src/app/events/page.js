import "bootstrap/dist/css/bootstrap.min.css";
export default async function Events() {
const res = await fetch('http://localhost:3000/api/events', { cache: 'no-store' });
const events = await res.json();

    return (
        <div className="p-8">
            <h1 className="text-2x1 font-bold mb-6">Evénements</h1>
            <div className="grid gap-4">
                {events.map((event) => (
                    <div key={event.id} className="border p-4 rounded-lg">
                        <h2 className="text-xl font-semibold" >{event.title}</h2>
                        <p className="text-gray-600">Date: {event.date}</p>
                        <p className="text-gray-600">Lieu: {event.location}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}