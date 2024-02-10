import { GetStaticPaths,GetStaticProps } from 'next';
import { BookDetail } from '@/components/BookDetail';

const page = () => {
    return (
        <BookDetail />
    );
}

// export const getStaticPaths: GetStaticPaths = () => {


//     return {
//         paths:[],
//         fallback:false
//     }
// }
// export const getStaticProps: GetStaticProps = async (ctx) =>{


//     return {
//         props:{

//         }
//     }
// }

export default page;