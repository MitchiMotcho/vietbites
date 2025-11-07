import "server-only";

import { getAnnouncements } from "@/lib/notion/announcements";
import { getMenu } from "@/lib/notion/menu";
import { getHours } from "@/lib/notion/hours";

import Hero from "@/components/homepage/Hero/Hero";
import Announcements from "@/components/homepage/Announcements";
import FeaturedMenu from "@/components/homepage/FeaturedMenu/FeaturedMenu";
import Location from "@/components/homepage/Location";

export default async function HomePage() {
    // fetch in parallel
    const [annPromise, menuPromise, hoursPromise] = [
        getAnnouncements(),
        getMenu(),
        getHours(),
    ];

    const [announcements, menu, hours] = await Promise.all([
        annPromise,
        menuPromise,
        hoursPromise,
    ]);

    return (
        <>
            <Hero hours={hours} />

            {announcements.length > 0 && <hr />}

            <Announcements announcements={announcements} />

            <hr />

            <FeaturedMenu menu={menu} />

            <hr />

            <Location />
        </>
    );
}
