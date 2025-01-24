import connectToDatabase from '../../../../lib/mongodb';

export async function GET(request) {
  try {
    const db = await connectToDatabase();
    const connectionState = db.connection.readyState;

    let status;
    switch (connectionState) {
      case 0:
        status = 'Disconnected';
        break;
      case 1:
        status = 'Connected';
        break;
      case 2:
        status = 'Connecting';
        break;
      case 3:
        status = 'Disconnecting';
        break;
      default:
        status = 'Unknown state';
    }

    return new Response(JSON.stringify({
      message: 'Connection status:',
      status,
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({
      message: 'Erreur lors de la connexion à la base de données',
      error: error.message,
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
