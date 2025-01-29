import './loading-style.css';
export default function Loading(){
    return (
        <div className="flex flex-col justify-center items-center mt-[2em]">
            <span className="loader"></span>
        </div>
    );
}