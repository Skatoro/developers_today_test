'use client'

import {useEffect, useState} from "react";
import {IVehicle} from "@/types/vehicle.types";
import {vehicleDates} from "@/constants/vehicleDates";
import Link from "next/link";
import {SelectorDropdown} from "@/components/ui/SelectorDropdown";

const Filters = () => {
    const [makes, setMakes] = useState<IVehicle[]>([]);

    const [selectedMake, setSelectedMake] = useState<IVehicle | null>(null)
    const [selectedYear, setSelectedYear] = useState<string | null>(null)
    useEffect(() => {
        const fetchMakes = async () => {
            const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');
            const data = await response.json();

            setMakes(data.Results);
        };
        fetchMakes();
    }, []);


    return (<>
        <div className={'flex w-full'}>
            <SelectorDropdown title={'Select vehicle'} dataset={makes} selectedItem={selectedMake}
                              className={'select-none mr-12'} dispatchSelection={setSelectedMake}
            />
            <SelectorDropdown title={'Select year'} dataset={vehicleDates} className={'select-none mr-12'}
                              selectedItem={selectedYear} dispatchSelection={setSelectedYear}
            />
            <Link href={`/results/${selectedMake?.MakeId}/${selectedYear}`}
                  className={`select-none p-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 
                  ${(!selectedMake || !selectedYear) && 'pointer-events-none'}`}
            >
                Next
            </Link>
        </div>
    </>);
};

export default Filters;