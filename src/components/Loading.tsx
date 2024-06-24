type LoadingProps = {
    className?: string,
    id?: string
}
export default function Loading(props: LoadingProps){
    return (
        <div className={props.className} id={props.id}>
            <div className="inline-block h-7 w-7 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"/>
            </div>
        </div>
    );
}
