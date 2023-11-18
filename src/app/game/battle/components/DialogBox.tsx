export function DialogBox({text}: {text:string}){
    return <div className="bg-slate-200 p-5 mx-10 border-4 border-black border-opacity-75">
        <p className="text-center">{text}</p>
    </div>
}