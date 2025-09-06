import Image from "next/image";
import { getMenu } from "@/lib/notion/menu";

export default async function Home() {
    const menu = await getMenu();

    return (
        <div>
            <h1>Welcome to VietBites</h1>
            <p>Your one-stop solution for Vietnamese cuisine.</p>
            <Image
                src="/images/logo.png"
                alt="VietBites Logo"
                width={200}
                height={100}
                className="h-20 w-auto"
            />

            <h2>Menu</h2>
            <ul className="mt-10 flex flex-wrap gap-8">
                {menu.map((item) => (
                    <li key={item.id}>
                        <h3>Name: {item.name}</h3>
                        <p>Description: {item.description}</p>
                        <p>Price: ${item.price}</p>
                        {item.photo && (
                            <img
                                src={item.photo}
                                alt={item.name}
                                width={150}
                                height={100}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
