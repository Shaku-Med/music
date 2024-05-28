let PlayBtn = ({ av, current, isloading, isplaying, handlePlay }) => {
    if (current.length > 0) {
        return (
            <button onClick={isloading ? e => { } : e => handlePlay(av, av.id !== current[0].id)} className={`${isloading ? 'dis' : ''}`} id="play"><i className={`${isloading ? ` bi bi-arrow-clockwise animate-spin` : `${isplaying && av.id === current[0].id ? 'fa fa-pause' : 'fa fa-play'}`}`} aria-hidden="true"></i></button>
        )
    }
    else {
        return ''
    }
};