import './globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import {RecoilRoot} from "recoil";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({Component, pageProps}:AppProps){
    return (
        <RecoilRoot>
            <Head>
                <title>Leetclone</title>
                <link rel='icon' href='/favicon.png'/>
            </Head>
            <ToastContainer/>
            <Component {...pageProps}/>
        </RecoilRoot>
    );
}
