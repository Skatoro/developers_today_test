import Filters from "@/components/screens/Filters";
import React from 'react'

export default async function Home() {

    return (
        <div className={'p-10'}>
            <div className={'text-3xl mb-3'}>Main Page</div>
            <Filters/>
        </div>
    );
}
