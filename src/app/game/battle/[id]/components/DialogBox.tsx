export function DialogBox({ text }: { text: string }) {
    return <div className="dialogBoxText p-5 ml-6 mr-6 mx-10 border-4 border-black border-opacity-75">
        <p className="text-center">{text}</p>
    </div>
}