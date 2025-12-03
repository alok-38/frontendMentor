export default async function Page({ params }) {
    const { slug } = await params;

    return (
        <div>
            <h1>Blog Post</h1>
            <p>You are reading: {slug}</p>
        </div>
    );
}
