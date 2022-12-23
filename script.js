let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');
let main = document.querySelector('body');



let timer;
let autoplay = 0;

let index_no = 0
console.log(index_no)
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');


//All songs list
let All_song = [

  {

    name: "Victony",
    path: "https://www.xclusiveloaded.com/wp-content/uploads/2022/05/Victony_ft_Tempoe_-_Soweto.mp3",
    img: "https://i0.wp.com/xclusiveloaded.com/wp-content/uploads/2022/05/Victony-%E2%80%93-Jolene-ft-Ktizo.jpg?fit=700%2C700&ssl=1",
    singer: "Soweto ft Tempoe"
  },

  {

    name: "Rush",
    path: "https://cdn.trendybeatz.com/audio/Ayra-Starr-Rush-New-Song-(TrendyBeatz.com).mp3",
    img: "https://trendybeatz.com/images/Ayra-Starr-Rush-Artwork.jpg",
    singer: "Ayra Starr"
  },

  {

    name: "KU LO SA - A COLORS SHOW",
    path: "https://www1.morexlusive.com/wp-content/uploads/2022/06/Oxlade_-_KU_LO_SA.mp3",
    img: "https://www2.beatzjam.com/wp-content/uploads/2022/10/Oxlade-%E2%80%93-KU-LO-SA-A-COLORS-SHOW.jpeg",
    singer: "Oxlade"
  },


  {

    name: "Cough (Odo) Ft. Empire",
    path: "https://www.trendyhiphop.com/wp-content/uploads/2022/10/Kizz_Daniel_-_Cough_Odo_.mp3",
    img: "https://i0.wp.com/www.trendyhiphop.com/wp-content/uploads/2022/10/Kizz-Daniel-%E2%80%93-Cough-Odo.jpg?fit=696%2C696&ssl=1",
    singer: "Kizz Daniel"
  },


  {

    name: "Blood Money",
    path: "https://www.six9ja.com/wp-content/uploads/2022/09/Kvng_Vinci_-_Blood_Money.mp3",
    img: "https://i0.wp.com/www.six9ja.com/wp-content/uploads/2022/08/Kvng-Vinci-%E2%80%93-Mother-My-Mother-TikTok-Trap-Remix.webp?fit=678%2C679&ssl=1",
    singer: "Kvng Vinci – AFRO-NAE Audio"
  },


  {

    name: "Tick tock",
    path: "https://connectloaded.com/wp-content/uploads/2020/10/Clean-Bandit-and-Mabel-Tick-Tock-feat.-24kGoldn-Official-Video.mp3",
    img: "https://i1.wp.com/i.ytimg.com/vi/yC8SPG2LwSA/maxresdefault.jpg?ssl=1",
    singer: "24k Golden"
  },


  {

    name: "African Beauty",
    path: "https://timheven.com/uploads/Diamond%20Platnumz%20Ft%20Omarion%20-%20African%20Beauty%20(Prod.%20KrizBeatz).mp3",
    img: "https://www.citimuzik.com/wp-content/uploads/2019/08/AFRICAN-BEAUTY-c.jpg",
    singer: "Diamond"
  },

  {

    name: "Power Reanger",
    path: "https://www.naijatracks.com/uploads/Power-Rangers.mp3",
    img: "https://notjustok.com/wp-content/uploads/2019/06/Teni-1.jpg",
    singer: "Teni"
  },
  {
    name: "Purely",
    path: "https://natirovibe.com/wp-content/uploads/2021/06/Lord-Sky-Purely-Virgin-Remix-Natirovibe.com_.mp3",
    img: "https://i.scdn.co/image/ab67616d0000b2732ff8c899c6b8850f9a96cc3f",
    singer: "Not listed"
  },
  {
    name: "High",
    path: "https://cdn.trendybeatz.com/audio/Adekunle-Gold-Ft-Davido-High-(TrendyBeatz.com).mp3",
    img: "https://loyaltyloaded.com.ng/wp-content/uploads/2021/09/High-artwork-1024x1024.png",
    singer: "Adekunle & Davido"
  },
  {
    name: "Hustle",
    path: "https://cdn.trendybeatz.com/audio/Teni-Hustle-New-Song-(TrendyBeatz.com).mp3",
    img: "https://www.intonaija.com/wp-content/uploads/2021/03/Teni-%E2%80%93-Black.jpg",
    singer: "Teni"
  },
  {
    name: "Kumama ",
    path: "https://gospelmetrics.com/wp-content/uploads/2022/02/Prinx-Emmanuel-Grace-Lokwa-Kumama-Papa-Refix-79.mp3",
    img: "https://i0.wp.com/gospelmetrics.com/wp-content/uploads/2022/02/maxresdefault-94.jpg?resize=640%2C360&ssl=1",
    singer: "Not listed"
  },
  {
    name: "Seggeh",
    path: "https://www.multiloaded.com/wp-content/uploads/2022/01/Kvng_Vinci_-_CV_Crazy_Madness_.mp3",
    img: "https://i0.wp.com/ketuvibes.com/wp-content/uploads/2022/01/Kvng-Vinci-%E2%80%93-CV-Crazy-Madness.jpg?w=720&ssl=1",
    singer: "Sheggeh"
  },

  {
    name: "Hot_Slap",
    path: "https://cdn.trendybeatz.com/audio/Lord-Sky-ft-Zlatan-Speed-Darlington-Hot-Slap-[TrendyBeatz.com].mp3",
    img: "https://trendybeatz.com/images/Lord-Sky-ft-Zlatan-Speed-Darlington-Hot-Slap.jpg",
    singer: "Lord_Sky"
  },

  {
    name: "Go_Check_bank",
    path: "https://www.xclusiveloaded.com/wp-content/uploads/2021/12/Lord_Sky_-_Go_and_Check_Your_Bank.mp3",
    img: "https://i0.wp.com/xclusiveloaded.com/wp-content/uploads/2021/12/Lord-Sky-%E2%80%93-Go-and-Check-Your-Bank.jpeg?fit=554%2C381&ssl=1",
    singer: "Lord_Sky"
  },

  {
    name: "Duduke",
    path: "https://naijaloaded.store/wp-content/uploads/2020/04/Simi-Duduke.mp3?_=1",
    img: "https://www.naijaloaded.com.ng/wp-content/uploads/2020/04/Simi-Duduke.jpg",
    singer: "Simi"
  },



  {
    name: "No_Body",
    path: "https://cdn.trendybeatz.com/audio/DJ-Neptune-Joeboy-Mr-Eazi-Nobody-[TrendyBeatz.com].mp3",
    img: "https://upload.wikimedia.org/wikipedia/en/a/a7/Official_Cover_of_Nobody_by_DJ_Neptune.jpg",
    singer: "Joeboy"
  },


  {
    name: "Jealous",
    path: "https://cdn.trendybeatz.com/audio/Fireboy-DML-Jealous-[TrendyBeatz.com].mp3",
    img: "https://trendybeatz.com/images/Laughter-Tears&Goosebumps.jpg",
    singer: "Joeboy"
  },

  {
    name: "commot_Ya_teeth",
    path: "https://www.djmoremusic.ng/doc/dll/2020/10/Lord_Skyy_-_I_Go_Commot_Ya_Teeth_Bankrolling_Who__(DJMoreMusic.NG).mp3",
    img: "https://artwork-cdn.7static.com/static/img/sleeveart/00/127/981/0012798162_350.jpg",
    singer: "Lork_sky"
  },

  {
    name: "Warisi",
    path: "https://naijalanded.com.ng/wp-content/uploads/2022/01/DJ_YK_Beats_-_Warisi_Cruise_Beat_naijalanded.com.ng.mp3",
    img: "https://naijalanded.com.ng/wp-content/uploads/2022/01/Screenshot_20220123-160006.png",
    singer: "Dj_YK"
  },


  {
    name: "Abeg",
    path: "https://naijalanded.com.ng/wp-content/uploads/2021/11/DJ_Neptune_Ft_Omah_Lay_Joeboy_-_Abeg_naijalanded.com.ng.mp3",
    img: "https://naijalanded.com.ng/wp-content/uploads/2021/11/Screenshot_20211126-232355.png",
    singer: "Joe_Boy_&_Omah_Lay"
  },

  {
    name: "infinite",
    path: "https://cdn.trendybeatz.com/audio/Olamide-Infinity-ft-Omah-Lay-[TrendyBeatz.com].mp3",
    img: "https://tooxclusive.com/wp-content/uploads/2020/10/Screen-Shot-2020-10-08-at-12.58.18-PM.png",
    singer: "Omahlay"
  },


  {
    name: "Brik_Pan_Brik",
    path: "https://www.aacehypez.net/wp-content/uploads/2020/10/Skillibeng-Brik-Pan-Brik-Official-Audio.mp3",
    img: "https://www.aacehypez.net/wp-content/uploads/2020/10/BRIK-PON-BRIK-RIDDIM-VERSION-mp3-image.jpg",
    singer: "Skillibeng"
  },

  {
    name: "Valentine",
    path: "https://eastnaija.com/wp-content/uploads/2021/02/Kabusa-%E2%80%93-Valentine-Is-Coming.mp3",
    img: "https://gospeltelegraph.com/wp-content/uploads/2022/02/Valentine-Is-Coming-Mp3-Download-1024x1024.jpg",
    singer: "Kabusa"
  },


  {
    name: "Baby_Riddim",
    path: "https://cdn.trendybeatz.com/audio/Fave-Baby-Riddim-(TrendyBeatz.com).mp3",
    img: "https://i.ytimg.com/vi/zAfl-ZhAmsM/hqdefault.jpg",
    singer: "Fave"
  },

  {
    name: "Blessings",
    path: "https://9jaflaver.com/wp-content/uploads/2019/06/GoodGirl_LA_Bless_Me_9jaflaver.com_.mp3",
    img: "https://9jaflaver.com/wp-content/uploads/2019/06/Screenshot_2019-06-18-Goodgirl-LA-Bless-Me-Google-Search.png",
    singer: "Good_Girl"
  },

  {
    name: "It_Ain't_Me",
    path: "https://cdn.trendybeatz.com/audio/Kygo-Ft-Selena-Gomez-It-Ain't-Me-New-Song-(TrendyBeatz.com).mp3",
    img: "https://trendybeatz.com/images/Kygo-Ft-Selena-Gomez-It-Ain't-Me-Art.jpg",
    singer: "Selena_Gomez"
  },

  {
    name: "Necessary",
    path: "https://cdn.trendybeatz.com/audio/Kizz-Daniel-Nesesari-feat-Philkeyz.mp3",
    img: "https://trendybeatz.com/images/kizz-daniel-no-bad-songz-album-art.jpg",
    singer: "Kiss_Daniel"
  },

  {
    name: "Beautifully",
    path: "https://naijatunez.com/wp-content/uploads/2021/10/FAVE-Beautifully.mp3",
    img: "https://naijatunez.com/wp-content/uploads/2021/10/img_3733.jpg",
    singer: "Fave"
  },


  {
    name: "Dark_side",
    path: "https://djsathi.me/files/download/id/45961&volume=75&showstop=1&showvolume=1",
    img: "https://i0.wp.com/www.naijabreed.com/wp-content/uploads/2020/05/DOWNLOAD-MP3-Alan-Walker-Ft.-AuRa-amp-Tomine-Harket-%E2%80%93.jpg?w=696&ssl=1",
    singer: "Alan_Walker"
  },


  {
    name: "Alone",
    path: "https://thinknews.com.ng/wp-content/uploads/2021/10/Alan_Walker_Faded_(thinkNews.com.ng).mp3",
    img: "https://thinknews.com.ng/wp-content/uploads/2021/10/Alan-Walker-Faded-1.jpg",
    singer: "Alan_Walker"
  },


  {
    name: "Spectre",
    path: "https://wowplus.net/wp-content/uploads/2019/09/Alan-Walker-The-Spectre.mp3",
    img: "https://wowplus.net/wp-content/uploads/2019/09/maxresdefault-2-768x432.jpg",
    singer: "Alan_Walker"
  },


  {
    name: "Alone_marshmello",
    path: "https://mybestfeelings.com/wp-content/uploads/2021/10/Marshmello-Alone-Mybestfeelings.com_.mp3",
    img: "https://i0.wp.com/mybestfeelings.com/wp-content/uploads/2021/10/artworks-000544246815-zythx5-t500x500.jpg?resize=742%2C742&is-pending-load=1#038;ssl=1",
    singer: "Marshmello"
  },

  {
    name: "Jowo",
    path: "https://cdn.trendybeatz.com/audio/Davido-Jowo-4-2(TrendyBeatz.com).mp3",
    img: "https://trendybeatz.com/images/Davido-A-Better-Time-Album-Artwork3.jpg",
    singer: "Davido"
  },


  {
    name: "Vroom",
    path: "https://www.skinnygist.com/wp-content/uploads/2022/03/The_Fanatix_-_Vroom_Ft_Idris_Elba_Lil_Tjay_Davido_Koffee_Moelogo_SkinnyGistcom.mp3?_=3",
    img: "https://i0.wp.com/skinnygist.com/wp-content/uploads/2022/03/The-Fanatix-Vroom.jpg?w=350&ssl=1",
    singer: "Tegh"
  },

  {
    name: "Vroom",
    path: "https://9jaflaverfiles.com/wp-content/uploads/2020/12/Idowest_NGNP_No_Girlfriend_No_Problem_Ft_Zlatan_9jaflaver.com_.mp3",
    img: "https://9jaflaver.com/wp-content/uploads/2020/12/Screenshot_2020-12-17-Idowest-%E2%80%93-NGNP-No-Girlfriend-No-Problem-ft-Zlatan-Google-Search.png",
    singer: "Tegh"
  },

  {
    name: "No_girlFrient_no_problem",
    path: "https://www.skinnygist.com/wp-content/uploads/2022/03/The_Fanatix_-_Vroom_Ft_Idris_Elba_Lil_Tjay_Davido_Koffee_Moelogo_SkinnyGistcom.mp3?_=3",
    img: "https://i0.wp.com/skinnygist.com/wp-content/uploads/2022/03/The-Fanatix-Vroom.jpg?w=350&ssl=1",
    singer: "NGNP"
  },

  {
    name: "GTA_SA",
    path: "https://instrumentalfx.co/wp-content/upload/11/Grand-Theft-Auto-San-Andreas-Theme-Song.mp3",
    img: "https://instrumentalfx.co/wp-content/uploads/2017/11/Grand-Theft-Auto-San-Andreas-theme-240x300.jpg",
    singer: "grand Theft Auto San Andreas"
  },


];


// All functions


// function load the track
function load_track(index_no) {
  clearInterval(timer);
  reset_slider();

  track.src = All_song[index_no].path;
  title.innerHTML = All_song[index_no].name;
  track_image.src = All_song[index_no].img;
  artist.innerHTML = All_song[index_no].singer;
  track.load();

  timer = setInterval(range_slider, 1000);
  total.innerHTML = All_song.length;
  present.innerHTML = index_no + 1;
}

load_track(index_no);


//mute sound function
function mute_sound() {
  track.volume = 0;
  volume.value = 0;
  volume_show.innerHTML = 0;
}


// checking.. the song is playing or not
function justplay() {
  if (Playing_song == false) {
    playsong();

  } else {
    pausesong();
  }
}


// reset song slider
function reset_slider() {
  slider.value = 0;
}

// play song
function playsong() {
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
  localStorage.setItem("song_index", index_no)
}

//pause song
function pausesong() {
  track.pause();
  Playing_song = false;
  play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
  localStorage.setItem("song_index", index_no)
}


// next song
function next_song() {
  if (index_no < All_song.length - 1) {
    index_no += 1;
    load_track(index_no);
    playsong();
    localStorage.setItem("song_index", index_no)
  } else {
    index_no = 0;
    load_track(index_no);
    playsong();
    localStorage.setItem("song_index", index_no)
  }
}


// previous song
function previous_song() {
  if (index_no > 0) {
    index_no -= 1;
    load_track(index_no);
    playsong();
    localStorage.setItem("song_index", index_no)
  } else {
    index_no = All_song.length;
    load_track(index_no);
    playsong();
    localStorage.setItem("song_index", index_no)
  }
}

// change volume
function volume_change() {
  volume_show.innerHTML = recent_volume.value;
  track.volume = recent_volume.value / 100;
}

// change slider position 
function change_duration() {
  slider_position = track.duration * (slider.value / 100);
  track.currentTime = slider_position;
  localStorage.setItem("slider_positions", slider_position)
}


// autoplay function
function autoplay_switch() {
  if (autoplay == 1) {
    autoplay = 0;
    auto_play.style.background = "rgba(255,255,255,0.2)";
  } else {
    autoplay = 1;
    auto_play.style.background = "#FF8A65";
  }
}


function range_slider() {
  let position = 0;

  // update slider position
  if (!isNaN(track.duration)) {
    position = track.currentTime * (100 / track.duration);
    slider.value = position;
  }




  // function will run when the song is over
  if (track.ended) {
    play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    if (autoplay == 1) {
      index_no += 1;
      load_track(index_no);
      playsong();
    }
  }
}

track.addEventListener("play", () => {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: All_song[index_no].name,
      artist: All_song[index_no].singer,
      album: All_song[index_no].name,
      artwork: [
        { src: All_song[index_no].img, sizes: '96x96', type: 'image/png' },
        { src: All_song[index_no].img, sizes: '128x128', type: 'image/png' },
        { src: All_song[index_no].img, sizes: '192x192', type: 'image/png' },
        { src: All_song[index_no].img, sizes: '256x256', type: 'image/png' },
        { src: All_song[index_no].img, sizes: '384x384', type: 'image/png' },
        { src: All_song[index_no].img, sizes: '512x512', type: 'image/png' },
      ]
    })
  }

  navigator.mediaSession.setActionHandler('nexttrack', () => {
    next_song()
  });

  navigator.mediaSession.setActionHandler('previoustrack', () => {
    previous_song()
  });

  navigator.mediaSession.setActionHandler('pause', () => {
    pausesong()
  });

  navigator.mediaSession.setActionHandler('play', () => {
    playsong()
  });

})
