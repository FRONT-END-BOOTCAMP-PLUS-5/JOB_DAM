export default function Profile ({ img, text }:Profile) {
    return (
        <>
            {
                img ? <img src={img} width={50} height={50}/> : <div>{text}</div>
            }
        </>
    );
};