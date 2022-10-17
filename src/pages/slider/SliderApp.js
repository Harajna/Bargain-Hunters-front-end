import ImageSlider from "./ImageSlider";
const SliderApp = () => {
  const slides = [
    { url: "https://firebasestorage.googleapis.com/v0/b/global-menu-e4622.appspot.com/o/images%2Fbargain%20hunters-logos_%25%251664791339905.jpeg?alt=media&token=0787cee1-bbd6-4bd3-a050-edca733650a6", title: "boat" },
    { url: "https://firebasestorage.googleapis.com/v0/b/global-menu-e4622.appspot.com/o/images%2Fdownload%20(1)%25%251665402703607.jpeg?alt=media&token=7c7d6a5c-a137-41d8-990c-810e3b016f84", title: "forest" },
    { url: "https://firebasestorage.googleapis.com/v0/b/global-menu-e4622.appspot.com/o/images%2Fdownload%25%251664876976234.jpeg?alt=media&token=bfd0a349-f50f-4ae1-aa36-1aba10e5d46f", title: "forest" },

    
  ];


  
  const containerStyles = {
    width: "500px",
    height: "300px",
    margin: "0 auto",
  };
  return (
    <div>
      <h1>Hello monsterlessons</h1>
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
    </div>
  );
};

export default SliderApp;