
const { useEffect, useLayoutEffect, useState, useRef } = React;

let audio = new Audio()
let App = () => {


    const [isS, setisS] = useState(null)
    const [isQ, setisQ] = useState(null)
    const [isplaying, setisplaying] = useState(null)
    const [kps, setkps] = useState(null)
    // 
    const [isloading, setisloading] = useState(null)
    // 
    const [input, setinput] = useState('')
    const [search, setsearch] = useState([])
    const [current, setcurrent] = useState([])
    // 
    const [plstate, setplstate] = useState(null)
    // 
    const [ar, setar] = useState([])
    // 
    const [shuffle, setshuffle] = useState(localStorage.getItem('shuffle') ? localStorage.getItem('shuffle') === 'true' ? true : false : null)
    // 
    const [autoplay, setautoplay] = useState(localStorage.getItem('autoplay') ? localStorage.getItem('autoplay') === 'true' ? true : false : null)
    const [loop, setloop] = useState(localStorage.getItem('loop') ? localStorage.getItem('loop') === 'true' ? true : false : null)
    // 
    const [volume, setvolume] = useState(localStorage.getItem('volume') ? parseFloat(localStorage.getItem('volume') ) : 0.7)
    const [range, setrange] = useState(0)
    // 
    const [queue, setqueue] = useState(localStorage.getItem('queue') ? JSON.parse(localStorage.getItem('queue')) : [])
    // 
    const timeOut = useRef()



    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredQueue = queue.filter(v =>
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.artists.some(artist => artist.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    let DetMinDate = (timespan) => {
        const formattedTimestamp = new Date(parseInt(timespan)).toISOString();
        let inputDate = new Date(formattedTimestamp);

        const currentDate = new Date();
        const diffInMilliseconds = currentDate - inputDate;
        const seconds = Math.floor(diffInMilliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = currentDate.getMonth() - inputDate.getMonth() + (12 * (currentDate.getFullYear() - inputDate.getFullYear()));
        const years = Math.floor(days / 365); // Calculate the number of years

        if (seconds < 5) {
            return "just now";
        } else if (seconds < 60) {
            return `${seconds} seconds ago`;
        } else if (minutes === 1) {
            return "1 minute ago";
        } else if (minutes < 60) {
            return `${minutes} minutes ago`;
        } else if (hours === 1) {
            return "1 hour ago";
        } else if (hours < 24) {
            return `${hours} hours ago`;
        } else if (days === 1) {
            return "yesterday";
        } else if (days < 7) {
            return `${days} days ago`;
        } else if (weeks === 1) {
            return "1 week ago";
        } else if (weeks < 4) {
            return `${weeks} weeks ago`;
        } else if (months === 1) {
            return "1 month ago";
        } else if (months < 12) {
            return `${months} months ago`;
        } else if (years === 1) {
            return "1 year ago";
        } else {
            return `${years} years ago`;
        }
    };

    let KeepQuiet = () => {
        try {
            const mediaElements = document.querySelectorAll('video, audio');
            mediaElements.forEach(media => {
                media.addEventListener('play', function () {
                    mediaElements.forEach(otherMedia => {
                        if (otherMedia !== media && !otherMedia.paused) {
                            otherMedia.pause();
                            audio.pause()
                        }
                    });
                });
            });
        } catch { }
    };


    let endpoints = {
        page: (params, uid) => {
            return `https://fawundu-api.vercel.app/api/v2/music/${uid}${params ? `/${params}` : ''}`
        },
        sound: (params, uid) => {
            return `https://advance-player-backend.vercel.app/api/open/spotify/get/song/${uid}${params ? `/${params}` : ''}`
        },
    };



    let ldAudio = (src) => {
        audio.src = src
        audio.volume = localStorage.getItem('volume') ? parseFloat(localStorage.getItem('volume')) : 0.7
        audio.currentTime = localStorage.getItem('current') === current ? current[0].id : '' ? localStorage.getItem('range') ? parseFloat(localStorage.getItem('range')) : 0 : 0
        // 
        audio.play()
        setisloading(false)
        setisplaying(true)
        // 
        // if (isplaying) {
        //     audio.play()
        //     setisplaying(true)
        // }
        // else {
        //     setisplaying(false)
        // }
    };


    let getSerch = () => {
        const userSearchHistory = localStorage.getItem('search_history') ? JSON.parse(localStorage.getItem('search_history')) : []

        function suggestCommonWords(searchHistory) {
            const wordCountMap = new Map();

            for (let i = 0; i < searchHistory.length; i++) {
                const words = searchHistory[i].toLowerCase().split(/\s+/);

                words.forEach(word => {
                    if (wordCountMap.has(word)) {
                        wordCountMap.set(word, wordCountMap.get(word) + 1);
                    } else {
                        wordCountMap.set(word, 1);
                    }
                });
            }

            const sortedWords = [...wordCountMap.entries()]
                .sort((a, b) => b[1] - a[1])
                .map(entry => entry[0]);

            return sortedWords;
        }

        const suggestedWords = suggestCommonWords(userSearchHistory);

        return suggestedWords.length < 1 ? 'Medzy Amara' : suggestedWords.join(' ')
    };

    let ldDt = async (hasid) => {
        try {
            if (queue && queue.length > 0) {
                let dt = localStorage.getItem('current') ? queue.find(v => v.id === localStorage.getItem('current')) : queue[0]
                setcurrent([dt])
                setisloading(true)

                let fnC = async (ob) => {
                    try {
                        if (!hasid) {
                            let fnd = ar.find(v => v.id === dt.id)
                            if (fnd) {
                                ldAudio(fnd.blob)

                            }
                            else {
                                let x = await axios.get(endpoints.sound(`?id=${dt.id}`, Math.random().toString().split('.')[1]));
                                // 
                                let fet = await fetch(x.data.link)
                                let ul = await fet.arrayBuffer()
                                // 
                                let b = new Blob([ul], { type: `audio/mp3` })
                                let r = [...ar]
                                let f = r.find(v => v.id === dt.id)
                                if (f) {
                                    f.blob = URL.createObjectURL(b)
                                    setar(r)
                                    // 
                                    ldAudio(f.blob)
                                    // 
                                }
                                else {
                                    let o = {
                                        id: dt.id,
                                        blob: URL.createObjectURL(b)
                                    }
                                    r.push(o)
                                    setar(r)
                                    // 
                                    ldAudio(o.blob)
                                    // 
                                }
                            }
                            // fnC(ob + 1)
                        }
                        else {
                            let x = await axios.get(endpoints.sound(`?id=${hasid.id}`, Math.random().toString().split('.')[1]));
                            // 
                            let fet = await fetch(x.data.link)
                            let ul = await fet.arrayBuffer()
                            // 
                            let b = new Blob([ul], { type: `audio/mp3` })
                            let r = [...ar]
                            let f = r.find(v => v.id === hasid.id)
                            if (f) {
                                f.blob = URL.createObjectURL(b)
                                setar(r)
                                // 
                                ldAudio(f.blob)
                                // 
                                setisloading(false)
                                if (isplaying) {
                                    audio.play()
                                    setisplaying(true)
                                }
                                else {
                                    setisplaying(false)
                                }
                                // 
                                return f
                            }
                            else {
                                let o = {
                                    id: hasid.id,
                                    blob: URL.createObjectURL(b)
                                }
                                r.push(o)
                                setar(r)
                                // 
                                ldAudio(o.blob)
                                // 
                                setisloading(false)
                                if (isplaying) {
                                    audio.play()
                                    setisplaying(true)
                                }
                                else {
                                    setisplaying(false)
                                }
                                // 
                                return o
                            }
                        }
                    }
                    catch {
                        setTimeout(() => ldDt(hasid), 2000)
                        return null
                    }
                };
                return fnC(0)
            }
            else {
                let ax = await axios.get(endpoints.page(`?search=${getSerch()}`, Math.random().toString().split('.')[1]));
                let rs = ax.data.data.tracks.items
                setsearch(rs)
                setqueue(rs)
                // 
                let fnC = async (ob) => {
                    if (ob <= rs.length - 1) {
                        let x = await axios.get(endpoints.sound(`?id=${rs[ob].id}`, Math.random().toString().split('.')[1]));
                        // 
                        let fet = await fetch(x.data.link)
                        let ul = await fet.arrayBuffer()
                        // 
                        let b = new Blob([ul], { type: `audio/mp3` })
                        let r = [...ar]
                        let f = r.find(v => v.id === rs[ob].id)
                        if (f) {
                            f.blob = URL.createObjectURL(b)
                            setar(r)
                        }
                        else {
                            let o = {
                                id: rs[ob].id,
                                blob: URL.createObjectURL(b)
                            }
                            r.push(o)
                            setar(r)
                        }
                        fnC(ob + 1)
                    }
                    else {
                        alert('complete')
                    }
                }
                fnC(0)
            }
        }
        catch (e) {
            setTimeout(() => ldDt(hasid), 2000)
            return null
        }
    };

    useEffect(() => {
        setInterval(KeepQuiet, 2000);
        ldDt()
    }, [queue]);


    let handleSearch = async (val) => {
        try {
            let ax = await axios.get(endpoints.page(`?search=${val}`, Math.random().toString().split('.')[1]));
            setsearch(ax.data.data.tracks.items)
            // 
            let search = localStorage.getItem('search_history') ? JSON.parse(localStorage.getItem('search_history')) : []
            search.push(val)
            localStorage.setItem('search_history', JSON.stringify(search))
            // 
        }
        catch (e) {
            alert(`Unable to find song, albums, or artist.`)
        }
    };

    const handleAdd = (val) => {
        let q = [...queue];
        let f = q.findIndex(v => v.id === val.id);
        if (f !== -1) {
            q.splice(f, 1);
            localStorage.setItem(`queue`, JSON.stringify(q))
            // 
        } else {
            val.available_markets = []
            val.album.available_markets = []
            q.push(val);
            // 
            localStorage.setItem(`queue`, JSON.stringify(q))
        }
        setqueue(q);
    };

    useEffect(() => {
        if (shuffle) {
            let srt = [...queue];
            for (let i = srt.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [srt[i], srt[j]] = [srt[j], srt[i]];
            }
            setqueue(srt);
        }
    }, [shuffle]);

    let handlePlay = async (val, isNew) => {
        let f = ar.find(v => v.id === val.id)
        if (f) {
            if (isNew) {
                setcurrent([val]);
                localStorage.setItem('current', val.id)
                ldDt()
            }
            else {
                if (audio.paused) {
                    audio.play()
                    setisplaying(true)
                }
                else {
                    audio.pause()
                    setisplaying(false)
                }
            }
        }
        else {
            if (isNew) {
                setcurrent([val])
                localStorage.setItem('current', val.id)
                ldDt()
            }
            else {
                let r = await ldDt(val);
                if (r) {
                    if (audio.paused) {
                        audio.play()
                        setisplaying(true)
                    }
                    else {
                        audio.pause()
                        setisplaying(false)
                    }
                }
                else {
                    alert(`⚠️⚠️⚠️ Unable to load audio`)
                }
            }
        }
    };

    let handleNextPrev = (isprev) => {
        if (current.length > 0) {
            let f = queue.findIndex(v => v.id === current[0].id)
            if (f !== -1) {
                if (isprev) {
                    if (f > 0) {
                        let q = queue[f - 1]
                        setcurrent([q])
                        localStorage.setItem('current', q.id)
                        ldDt()
                    }
                    else {
                        let rand = Math.floor(Math.random() * queue.length)
                        let q = queue[rand]
                        // 
                        setcurrent([q])
                        localStorage.setItem('current', q.id)
                        ldDt()
                    }
                }
                else {
                    if (f < queue.length - 1) {
                        let q = queue[f + 1]
                        setcurrent([q])
                        localStorage.setItem('current', q.id)
                        ldDt()
                    }
                    else {
                        let rand = Math.floor(Math.random() * queue.length)
                        let q = queue[rand]
                        setcurrent([q])
                        localStorage.setItem('current', q.id)
                        ldDt()
                    }
                }
            }
        }
    };



    let msToMinutesSeconds = (ms) => {
        let totalSeconds = Math.floor(ms / 1000);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return minutes + ':' + seconds;
    };


    let change_duration = (value) => {
        let dur = audio.duration * (value / 100)
        audio.currentTime = dur
        localStorage.setItem('range', dur)
        // 
        setrange(value)
    };

    let Mquaries = () => {
        try {
            let getC = queue.find(v => v.id === localStorage.getItem('current'))
            if (getC) {
                if ('mediaSession' in navigator) {
                    let val = getC
                    // 
                    navigator.mediaSession.metadata = new MediaMetadata({
                        title: val.name,
                        artist: val.artists.flatMap(v => v.name).join(', '),
                        album: val.name,
                        artwork: [
                            { src: val.hasOwnProperty('album') ? val.album.images[0].url : val.images[0].url, sizes: '96x96', type: 'image/png' },
                            { src: val.hasOwnProperty('album') ? val.album.images[0].url : val.images[0].url, sizes: '128x128', type: 'image/png' },
                            { src: val.hasOwnProperty('album') ? val.album.images[0].url : val.images[0].url, sizes: '192x192', type: 'image/png' },
                            { src: val.hasOwnProperty('album') ? val.album.images[0].url : val.images[0].url, sizes: '256x256', type: 'image/png' },
                            { src: val.hasOwnProperty('album') ? val.album.images[0].url : val.images[0].url, sizes: '384x384', type: 'image/png' },
                            { src: val.hasOwnProperty('album') ? val.album.images[0].url : val.images[0].url, sizes: '512x512', type: 'image/png' },
                        ]
                    })
                    
                    navigator.mediaSession.setActionHandler('nexttrack', () => {
                        let next = document.querySelector('#next')
                        if (next) {
                            next.click()
                        }
                    });
    
                    navigator.mediaSession.setActionHandler('previoustrack', () => {
                        let pre = document.querySelector('#pre')
                        if (pre) {
                            pre.click()
                        }
                    });
    
                    navigator.mediaSession.setActionHandler('pause', () => {
                        let play = document.querySelector('#play')
                        if (play) {
                            play.click()
                        }
                    });
    
                    navigator.mediaSession.setActionHandler('play', () => {
                        let play = document.querySelector('#play')
                        if (play) {
                            play.click()
                        }
                    });

                    navigator.mediaSession.setActionHandler("seekto", (details) => {
                        if (details.seekTimeSeconds != null) {
                            let seekTime = details.seekTimeSeconds;
                            let newPosition = (seekTime / audio.duration) * 100;

                            rangeSlider.value = newPosition;
                            audio.currentTime = seekTime;
                            localStorage.setItem('range', seekTime);
                            setrange(newPosition);
                        }
                    });
                }

            }
        }
        catch { }
    };

    useLayoutEffect(() => {
        audio.addEventListener('timeupdate', e => {
            let pos = 0
            pos = audio.currentTime * (100 / audio.duration)
            localStorage.setItem('range', audio.currentTime)
            setrange(pos)
            // 
            let s = parseInt(audio.currentTime % 60)
            let m = parseInt((audio.currentTime / 60) % 60)
            // 
            if (s < 10) {
                setplstate(`${m}:0${s}`)
            }
            else {
                setplstate(`${m}:${s}`)
            }
        })
        audio.addEventListener('ended', e => {
            if (autoplay && !loop) {
                let next = document.querySelector('#next')
                if (next) {
                    next.click()
                }
            }
            else {
                if (loop) {
                    audio.currentTime = 0
                    audio.play()
                }
                else {
                    audio.currentTime = 0
                    audio.pause()
                }
            }
        })


        audio.addEventListener("play", () => {
            Mquaries()
        })

        audio.addEventListener("pause", () => {
            Mquaries()
        })

        audio.addEventListener('loadedmetadata', () => {
            Mquaries()
        })

        }, []);

    let callBack = (color) => {
        let rand = Math.floor(Math.random() * color.length)
        document.documentElement.style.setProperty('--bg', color[rand])
    }

    return (
        <>
            {
                current.length > 0 ?
                (current || []).map((av, ak) => {
                    document.title = `${av.name} ${av.name ? "|" : ''} MUSIC - Discover, Create, Enjoy`
                    // 
                        return (
                            <div key={ak} className="contain h-full w-full overflow-hidden">
                                <div className="main w-full h-full ">
                                    <div className="lftPath overflow-hidden  flex items-center justify-center w-full h-full p-2 relative">
                                        <div id="logo" className=" w-full ">
                                            <div className="tog flex items-center justify-start gap-2">
                                                <i className="fa fa-music"></i>
                                                <div>Music</div>
                                            </div>
                                            <div className="partright flex items-center justify-start gap-2 ">
                                                <i onClick={e => setisQ(isQ ? false : true)} className=" bi-list h-10 w-10 flex items-center justify-center rounded-lg shadow-lg bg-[#ccc] text-[#000]"></i>
                                                <i onClick={e => setisS(isS ? false : true)} className="fa fa-search h-10 w-10 flex items-center justify-center rounded-lg shadow-lg bg-[#ccc] text-[#000]" />
                                            </div>
                                        </div>
                                        <div className="left relative h-full w-full">
                                            <div className="imgC bg-[var(--darkbg)] flex items-center justify-center overflow-hidden rounded-xl shadow-lg w-full h-full max-w-[85%] max-h-[85%] max-[1000px]:max-w-[50%] max-[1000px]:max-h-[50%] max-[1000px]:min-w-[300px] max-[1000px]:min-h-[300px] transition-all">
                                                <Img callBack={callBack} src={av.hasOwnProperty('album') ? av.album.images[0].url : av.images[0].url} className=" object-cover" id="track_image" />
                                            </div>
                                        </div>

                                        {
                                            isQ ?
                                                <>
                                                    <div onClick={e => setisQ(isQ ? false : true)} className="dimExit h-full fixed top-0 left-0 bg-[black] w-full "></div>
                                                    <div onClick={e => setisQ(isQ ? false : true)} className="close bi bi-x lg bg-[red] mt-1 z-[100000000] brd text-white fixed top-2 right-5 cursor-pointer w-5 h-5 min-w-5 min-h-5  flex items-center justify-center rounded-lg"></div>
                                                    <div className="searchBt pt-10 flex items-center justify-start flex-col fixed h-full z-[10000000] w-full backdrop-blur-md overflow-x-hidden overflow-y-auto">
                                                    <div className="containeCters max-w-[90%] w-full h-fit z-[10000000000] relative">
                                                        <div className="quSs text-center w-full p-2 text-2xl">
                                                            {queue.length > 1 ? 'QUEUES' : 'QUEUE'}
                                                        </div>

                                                        <input
                                                            type="text"
                                                            value={searchQuery}
                                                            onChange={handleSearchChange}
                                                            placeholder="Search queue..."
                                                            className="search-input p-2 outline-none w-full rounded-lg brd shadow-md"
                                                            />
                                                            
                                                            <div className="queurSize text-left w-full p-1 opacity-[.6] text-sm">
                                                                {`${filteredQueue.length} ${filteredQueue.length > 1 ? 'Items in queue' : 'Item in queue'}`}
                                                            </div>

                                                        {
                                                            filteredQueue.length > 0 ?
                                                                    (filteredQueue || []).map((v, k) => {
                                                                    return (
                                                                        <div onDragStart={e => {
                                                                            e.dataTransfer.setData('text/plain', k)
                                                                        }} onDragOver={e => e.preventDefault()} onDrop={e => {
                                                                            e.preventDefault()
                                                                            let index = JSON.parse(e.dataTransfer.getData('text/plain'))
                                                                            if (index === k) { return }
                                                                            else {
                                                                                let newQ = [...queue]
                                                                                let [draggedItem] = newQ.splice(index, 1)
                                                                                newQ.splice(k, 0, draggedItem)
                                                                                setqueue(newQ)
                                                                                // 
                                                                                localStorage.setItem(`queue`, JSON.stringify(newQ))
                                                                            }
                                                                        }} draggable={'true'} htmlFor={`id_${v.id}`} key={k} className="rsults hover:scale-[.98] transition-all w-full flex items-center justify-start gap-2 p-1 bg-[var(--darkbg)] mt-1 rounded-xl shadow-lg brd">
                                                        
                                                                            <div className="playBtnHere">
                                                                                <PlayBtn handlePlay={handlePlay} isplaying={isplaying} isloading={isloading} current={current} av={v}/>
                                                                            </div>
                                                                            
                                                                            <div className="imgf h-10 w-10 min-w-10 min-h-10 rounded-lg overflow-hidden">
                                                                                <img className="w-full object-cover" src={v.hasOwnProperty('album') ? v.album.images[0].url : v.images[0].url} alt="" />
                                                                            </div>
                                                                            <div className="txMx w-full">
                                                                                <div className="nxmx w-full text-sm flex items-center justify-between gap-2">
                                                                                    <div className="timNam line-clamp-1">{v.name}</div>
                                                                                    {
                                                                                        v.hasOwnProperty('album') ?
                                                                                            <div title={new Date(v.album.release_date).toLocaleString()} className="timePost min-w-fit">{DetMinDate(new Date(v.album.release_date).getTime())}</div>
                                                                                            : ''
                                                                                    }
                                                                                </div>
                                                                                <div className="artsts flex items-center justify-between gap-2">
                                                                                    <div className="smtitle line-clamp-1 text-xs flex items-center justify-start">
                                                                                    {
                                                                                        v.artists.length > 0 ?
                                                                                            (v.artists || []).map((val, key) => {
                                                                                                return (
                                                                                                    <span key={key}>{val.name}{key !== v.artists.length - 1 ? ', ' : ''}</span>
                                                                                                )
                                                                                            }) : ''
                                                                                    }
                                                                                    </div>
                                                                                    <div className="timS min-w-fit text-xs opacity-[.6]">{msToMinutesSeconds(v.duration_ms)} M</div>
                                                                                </div>
                                                                            </div>
                                                                            <div onClick={e => {
                                                                                if (window.confirm(`Warning! you're about to remove this song from your playlist queue, are you weeling to remove it? OK (Proceed) or CANCEL (Ignore)`)) {
                                                                                    handleAdd(v)
                                                                                }
                                                                            }} title={"remove from queue"} className="removeBtns h-10 w-10 min-w-10 min-h-10 flex items-center justify-center text-[red] brd cursor-pointer">
                                                                                <i className="bi bi-trash" />
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }) :
                                                                <div className="notFound text-center opacity-[.6] flex-col uppercase h-full w-full flex items-center justify-center">
                                                                    Nothing available in your queue
                                                                </div>
                                                        }
                                                    </div>
                                                </div>
                                                </>
                                                : ''
                                        }

                                        {
                                            isS ?
                                                <div className="searchBt pt-10 flex items-center justify-center flex-col fixed h-full z-[10000000] w-full backdrop-blur-md">
                                                    <div onClick={e => setisS(isS ? false : true)} className="dimExit h-full fixed top-0 left-0 bg-[black] w-full cursor-pointer "></div>
                                                    <div className="containeCters max-w-[90%] w-fit h-full z-[10000000000]">
                                                        <div className="contYpg w-full h-fit">
                                                            <div className="inpS  sticky top-0 left-0 z-[1000000000] p-2 w-full flex items-center justify-center gap-2 ">
                                                                <div onClick={e => {
                                                                    if (window.confirm(`Are you sure you want to empty your queue storage? \n\n You will lose your qued songs. \n\n (OK) to proceed or (Cancel) to ignore`)) {
                                                                        localStorage.clear()
                                                                        sessionStorage.clear()
                                                                        window.location.reload()
                                                                    }
                                                                }} className="bi bi-trash text-[red] cursor-pointer h-5 w-5 flex items-center p-1 text-sm justify-center"></div>
                                                                <div className="searchpart  brd bg-[var(--darkbg)] p-2 rounded-lg w-full flex items-center justify-start gap-1">
                                                                    <div className="bi bi-search h-5 w-5 flex items-center p-1 text-sm justify-center"></div>
                                                                    <input value={input} spellingcheck="off" onKeyUp={e => {
                                                                        clearTimeout(timeOut.current)
                                                                        timeOut.current = setTimeout(() => {
                                                                            if (e.target.value.trim().length > 0) {
                                                                                handleSearch(e.target.value.toLowerCase())
                                                                            }
                                                                        }, 500)
                                                                    }} onChange={e => setinput(e.target.value)} autoFocus className=" p-1 w-full h-full bg-[transparent] outline-none " placeholder=" Search songs" type="search" name="" id="" />
                                                                </div>
                                                                <div onClick={e => setisS(isS ? false : true)} className="close bi bi-x lg bg-[red] mt-1 brd text-white cursor-pointer w-5 h-5 min-w-5 min-h-5  flex items-center justify-center rounded-lg"></div>
                                                            </div>
                                                            {search.length > 0 ? <div className="tell text-center p-1">Found {`${search.length} ${search.length > 2 ? 'results' : 'result'}`}</div> : ''}
                                                        </div>
                                                        <div className="inpS p-2 w-full h-full overflow-x-hidden overflow-y-auto">
                                                            {/* <div className="results flex items-center justify-between flex-col h-full w-full"> */}
                                                            {
                                                                search.length > 0 ?
                                                                    (search || []).map((v, k) => {
                                                                        const isChecked = queue.some(item => item.id === v.id);
                                                                        return (
                                                                            <label htmlFor={`id_${v.id}`} key={k} className="rsults cursor-pointer w-full flex items-center justify-start gap-2 p-1 bg-[var(--darkbg)] mt-1 rounded-xl shadow-lg brd">
                                                                                <div className="checked h-10 w-10 flex items-center justify-center">
                                                                                    <input
                                                                                        onChange={() => handleAdd(v)}
                                                                                        id={`id_${v.id}`}
                                                                                        type="checkbox"
                                                                                        checked={isChecked}
                                                                                        className={``}
                                                                                    />
                                                                                </div>
                                                                                <div className="imgf h-10 w-10 min-w-10 min-h-10 rounded-lg overflow-hidden">
                                                                                    <img className="w-full object-cover" src={v.hasOwnProperty('album') ? v.album.images[0] ? v.album.images[0].url : null : null} alt="" />
                                                                                </div>
                                                                                <div className="txMx w-full">
                                                                                    <div className="nxmx w-full text-sm flex items-center justify-between gap-2">
                                                                                        <div className="timNam line-clamp-1">{v.name}</div>
                                                                                        {
                                                                                            v.hasOwnProperty('album') ?
                                                                                                <div title={new Date(v.album.release_date).toLocaleString()} className="timePost min-w-fit">{DetMinDate(new Date(v.album.release_date).getTime())}</div>
                                                                                                : ''
                                                                                        }
                                                                                    </div>
                                                                                    <div className="artsts flex items-center justify-between gap-2">
                                                                                        <div className="smtitle line-clamp-1 text-xs flex items-center justify-start">
                                                                                        {
                                                                                            v.artists.length > 0 ?
                                                                                                (v.artists || []).map((val, key) => {
                                                                                                    return (
                                                                                                        <span key={key}>{val.name}{key !== v.artists.length - 1 ? ', ' : ''}</span>
                                                                                                    )
                                                                                                }) : ''
                                                                                        }
                                                                                        </div>
                                                                                        
                                                                                        <div className="timS min-w-fit text-xs opacity-[.6]">{msToMinutesSeconds(v.duration_ms)} M</div>
                                                                                    </div>
                                                                                    {
                                                                                        v.preview_url ?
                                                                                            <div className="preview_audio w-full">
                                                                                                <audio className={'h-6 w-full'} src={v.preview_url} controls />
                                                                                            </div> : ''
                                                                                    }
                                                                                </div>
                                                                            </label>
                                                                        )
                                                                    }) :
                                                                    <div className="notFound text-center opacity-[.6] flex-col uppercase h-full w-full flex items-center justify-center">
                                                                        Search is empty. <br /> start by typing.
                                                                    </div>
                                                            }
                                                        </div>
                                                        {/* </div> */}
                                                    </div>
                                                </div> : ''
                                        }
                                    </div>


                                    <div className="centerCtainer w-full h-full  flex flex-col items-center justify-center relative gap-8 max-[1000px]:gap-2 max-[600px]:gap-6">

                                        {/* <div className="show_song_no absolute top-2 w-fit p-1 gap-1 rounded-lg shadow-lg flex right-2 bg-[#cccc]">
                                            <p id="present">0</p>
                                            <p>/</p>
                                            <p id="total">0</p>
                                        </div> */}

                                        <div className="righttitle text-center w-full flex justify-center flex-col gap-2 items-center p-2 ">
                                            <p id="title" className=" line-clamp-1 text-6xl max-[1000px]:text-5xl max-[600px]:text-3xl">{av.name}</p>
                                            <p id="artist" className=" line-clamp-1">
                                                {
                                                    av.artists.length > 0 ?
                                                        (av.artists || []).map((val, key) => {
                                                            return (
                                                                <span key={key}>{val.name}{key !== av.artists.length - 1 ? ', ' : ''}</span>
                                                            )
                                                        }) : ''
                                                }
                                            </p>
                                        </div>

                                        <div className="middle">
                                            <button onClick={e => {
                                                setshuffle(shuffle ? false : true)
                                                localStorage.setItem(`shuffle`, shuffle ? false : true)
                                            }}><i className={`bi bi-shuffle ${shuffle ? `text-[#67d567]` : ``}`} aria-hidden="true"></i></button>
                                            <button onClick={e => handleNextPrev(true)}  id="pre"><i className="fa fa-step-backward" aria-hidden="true"></i></button>
                                            <PlayBtn handlePlay={handlePlay} isplaying={isplaying} isloading={isloading} current={current} av={av}/>
                                            <button onClick={e => handleNextPrev()} id="next"><i className="fa fa-step-forward" aria-hidden="true"></i></button>
                                            <button onClick={e => {
                                                setloop(loop ? false : true)
                                                localStorage.setItem(`loop`, loop ? false : true)
                                            }} ><i className={` bi bi-repeat ${loop ? 'text-[#67d567]' : ''}`} aria-hidden="true"></i></button>
                                        </div>
                                        <button onClick={e => {
                                                setautoplay(autoplay ? false : true)
                                                localStorage.setItem(`autoplay`, autoplay ? false : true)
                                            }} className={`rounded-lg shadow-lg ${autoplay ? 'autoplay brd' : ''}`} id="auto">Auto play <i className="fa fa-circle-o-notch" aria-hidden="true"></i></button>

                                        <div className="duration w-full flex items-center justify-center p-1">
                                            <div className="durationst">{plstate ? plstate : '0:00'}</div>
                                            <input value={range} onPointerDown={e => {
                                                setkps(isplaying);
                                            }} onChange={e => {
                                                audio.pause()
                                                // 
                                                change_duration(e.target.value)
                                                setisplaying(false)
                                            }} onPointerUp={e => {
                                                if (kps && !isplaying) {
                                                    audio.play()
                                                    setisplaying(true)
                                                }
                                            }} type="range" min="0" max="100" id="duration_slider" />
                                            <div className="duend">{msToMinutesSeconds(av.duration_ms)}</div>
                                        </div>

                                        <div className="volume w-full flex items-center justify-center p-1">
                                            <p id="volume_show" className=" rounded-lg shadow-lg  h-10 w-10 flex items-center justify-center line-clamp-1 overflow-hidden">{(volume * 100).toString().split('.')[0]}</p>
                                            <input value={volume * 100} onChange={e => {
                                                let vol = e.target.value / 100
                                                audio.volume = vol
                                                // 
                                                localStorage.setItem('volume', vol)
                                                setvolume(vol)
                                            }} className=" w-full" type="range" min="0" max="100" id="volume" />
                                            <i className={`  ${volume * 100 < 1 ? ` bi bi-volume-mute text-[red]` : volume * 100 >= 70 ? `bi bi-volume-up text-[red]` : 'bi bi-volume-down text-[green]'} rounded-lg shadow-lg h-10 w-10 flex items-center justify-center`} aria-hidden="true" onclick="mute_sound()" id="volume_icon"></i>
                                        </div>

                                    </div>




                                </div>
                            </div>
                        )
                    }) : ''
            }
        </>
    );
};