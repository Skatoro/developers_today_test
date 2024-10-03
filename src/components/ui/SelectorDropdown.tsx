'use client'
import React, {Dispatch, InputHTMLAttributes, SetStateAction, useEffect, useRef, useState} from "react";
import {useHandleOutsideClick} from "@/hooks/useHandleOutsideClick";
import {IVehicle} from "@/types/vehicle.types";

interface ISelector extends InputHTMLAttributes<HTMLButtonElement> {
    title: string
    dataset: string[] | IVehicle[]
    selectedItem: string | IVehicle | null
    dispatchSelection: Dispatch<SetStateAction<string | null>>
        | Dispatch<SetStateAction<IVehicle | null>>
}

export function SelectorDropdown({title, className, dataset, dispatchSelection, selectedItem}: ISelector) {
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const [dropdownActive, setDropdownActive] = useState<boolean>(false)
    const isClickedOutside = useHandleOutsideClick(menuRef, buttonRef)

    useEffect(() => {
        if (isClickedOutside) setDropdownActive(false)
    }, [isClickedOutside]);

    function handleSelect(dataItem: any) {
        dispatchSelection(dataItem)
        setDropdownActive(false)
    }

    return (<>
        <div className={`relative ${className}`}>
            <div
                className={`w-fit  p-3 rounded-xl cursor-pointer bg-neutral-800 hover:bg-neutral-700 
                ${dropdownActive && 'bg-neutral-700'}`}
                onClick={() => setDropdownActive(!dropdownActive)}
                ref={buttonRef}
            >
                <div>
                    {selectedItem
                        ? typeof selectedItem === 'string'
                            ? selectedItem
                            : selectedItem.MakeName
                        : title}
                </div>
            </div>

            {dropdownActive &&
                <div
                    className={'max-w-96 min-w-40 absolute top-14 left-0 max-h-40vh overflow-y-scroll bg-neutral-800 rounded-xl'}
                    ref={menuRef}
                >
                    {dataset && dataset.map((dataItem, index) =>
                        <div
                            key={index} onClick={() => handleSelect(dataItem)}
                            className={'px-3 py-2 cursor-pointer hover:bg-neutral-700 text-center'}
                        >
                            {typeof dataItem === 'string'
                                ? dataItem
                                : dataItem.MakeName}
                        </div>)}
                </div>}
        </div>
    </>)
}