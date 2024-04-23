// import { Component } from "react";

const detail = [
    {
        name: "Registration Number",
        Component: () => 
            <div className="w-[40vw] h-[40vh] flex flex-col justify-between items-center border mx-auto my-4 p-4 flex justify-center border-sky-300 rounded-lg">
                <h1>Registration Content</h1>
                <form className="w-full flex flex-col items-center gap-4">
                    <label htmlFor="regNo">Enter the registration number</label>
                    <input type="number" id="regNo" className="h-10 w-full rounded-full border border-zinc-300" />
                    <button type="submit" className="bg-zinc-700 w-[12rem] text-zinc-50 rounded-full py-2 px-8">verify</button>
                </form>
            </div>
    },
    {
        name: "Personal Detail",
        Component: () => 
            <div className="w-[40vw] h-[40vh] border mx-auto my-4 p-4 flex justify-center border-sky-300 rounded-lg">
                <h1>Personal Detail Content</h1>
            </div>
    },
    {
        name: "Room Select",
        Component: () => 
            <div className="w-[40vw] h-[40vh] border mx-auto my-4 p-4 flex justify-center border-sky-300 rounded-lg">
                <h1>Room Select Content</h1>
            </div>
    },
    {
        name: "Final Submit",
        Component: () => 
            <div className="w-[40vw] h-[40vh] border mx-auto my-4 p-4 flex justify-center border-sky-300 rounded-lg">
                <h1>Final Submit Content</h1>
            </div>
    },
]

export default detail;