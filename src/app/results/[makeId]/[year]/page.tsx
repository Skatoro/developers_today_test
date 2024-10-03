'use client'

import React, {useEffect, useState} from "react";
import {IVehicle} from "@/types/vehicle.types";
import {vehicleDates} from "@/constants/vehicleDates";
import {IVehicleResult} from "@/types/vehicleResult.types";
import {Loader} from "@/components/ui/Loader";

export default function ResultPage({params}: {
    params: {
        makeId: string,
        year: string
    }
}) {
    const makeId = params.makeId
    const year = params.year
    const [models, setModels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchModels = async () => {
            setIsLoading(true);
            const response = await fetch(
                `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
            );
            const data = await response.json();
            setModels(data.Results);
            setIsLoading(false);
        };

        fetchModels();
    }, [makeId, year]);
    return (<>
        <div className={'p-10'}>
            <div className={'text-3xl'}>Vehicle Results</div>
            <div className={'p-2'}>
                {isLoading
                    ? <div className={'h-full'}><Loader size={50}/></div>
                    : models
                        ? models.map((model: IVehicleResult, index) => {
                            return <div className={'flex mb-2'} key={index}>
                                <div>{model.Make_Name} {model.Model_Name}</div>
                            </div>
                        })
                        : <div>No vehicles has been found</div>}
            </div>
        </div>

    </>)
}

export async function getStaticPaths() {
    const vehicleResponse = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');
    const vehicleData = await vehicleResponse.json();
    const makeIds: string[] = vehicleData.map((make: IVehicle) => make.MakeId)

    const years = vehicleDates;

    const paths = makeIds.flatMap((makeId) =>
        years.map((year) => ({
            params: {
                makeId,
                year
            }
        }))
    );

    return {
        paths,
        fallback: false,
    };
}