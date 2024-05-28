let Img = ({src, alt, className, callBack}) => {
    const [image, setImage] = useState(true);

    let extractColors = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let img = new Image()
        img.crossOrigin = 'Anonymous'
        img.src = src

        img.onload = () => {
            try {
                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                const colors = {};
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    const a = data[i + 3];
                    if (a > 0) {
                        const rgb = `rgb(${r},${g},${b})`;
                        if (!colors[rgb]) {
                            colors[rgb] = 0;
                        }
                        colors[rgb]++;
                    }
                }
                callBack(Object.keys(colors))
            }
            catch (e) {
                console.log(e)
            }
        }
    };

    useEffect(() => { 
        if (callBack) {
            extractColors()
        }
    }, [src])

    return (
        <>
            {
                src && image ? 
                    <img loading="lazy" src={src} className={className} alt={alt} onError={e => setImage(null)} /> : 
                    <>
                        <div className={className}></div>
                    </>
            }
        </>
    )
}