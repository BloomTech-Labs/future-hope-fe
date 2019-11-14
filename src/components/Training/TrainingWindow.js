import React from 'react';
// import { firestore } from "../../config/fbConfig";
import { ReactTinyLink } from 'react-tiny-link';
import photosGhana from "./randomImages.js"

const TrainingWindow = () => {
    // const [category, setCategory] = useState({ source: '' })

// async function postTraining(e) {
//     e.preventDefault(e)
//     const training = firestore.collection('training').doc().collection('category')
//     await training.set({
//         source:link,
//         timestamp: new Date().toLocaleTimeString()
//     })
//     form.reset()

// }

// postTraining()
    const dummyLinks = ["https://www.youtube.com/watch?v=wyHbiYngzsY","https://www.youtube.com/watch?v=Fbs5KUz_pe0","https://www.britannica.com/place/Ghana/Daily-life-and-social-customs"]

    return(
        <div>
            {dummyLinks.map((link, index) => ([
                        <ReactTinyLink
                        cardSize="large"
                        showGraphic={true}
                        maxLine={2}
                        minLine={1}
                        proxyUrl="https://cors-anywhere.herokuapp.com/"
                        url={link}
                        header={`Module ${index + 1}`}
                        description="Ghanaian Food"
                        defaultMedia={photosGhana}
                        />,
                        <br/>
            ]))}
        </div>
       
    )
}

export default TrainingWindow;