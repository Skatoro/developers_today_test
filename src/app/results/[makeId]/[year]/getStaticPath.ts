import {IVehicle} from "@/types/vehicle.types";
import {vehicleDates} from "@/constants/vehicleDates";
import {GetStaticPaths} from "next";

export const getStaticPaths = (async () => {
    console.log('penis')
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
}) satisfies GetStaticPaths