import '../css/mainPage.css'
import carrefour_logo from '../assets/carrefour.jpg'
import east_logo from '../assets/east.jpg'
import life_logo from '../assets/life.jpg'
import momo_logo from '../assets/momo.jpg'
import shopee_logo from '../assets/shopee.jpg'
import rakuten_logo from '../assets/rakuten.jpg'
import yahoo_logo from '../assets/yahoo.jpg'
import taobao_logo from '../assets/taobao.jpg'
import shoppingMall from '../assets/shopping-center.png'
import cart from '../assets/cart.png'
import * as React from 'react';
import Stack from '@mui/material/Stack';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useRef } from 'react';

const siteData = [
    {
        img: yahoo_logo,
        title: 'Yahoo購物網',
        href: 'https://tw.buy.yahoo.com/'
    },
    {
        img: carrefour_logo,
        title: '家樂福',
        href: 'https://www.carrefour.com.tw/'
    },
    {
        img: east_logo,
        title: '東森購物網',
        href: 'https://www.etmall.com.tw/'
    },
    {
        img: rakuten_logo,
        title: '樂天市場',
        href: 'https://www.rakuten.com.tw/'
    },
    {
        img: momo_logo,
        title: 'momo購物網',
        href: 'https://www.momoshop.com.tw/main/Main.jsp'
    },
    {
        img: life_logo,
        title: '生活市集',
        href: 'https://www.buy123.com.tw/'
    },
    {
        img: taobao_logo,
        title: '淘寶',
        href: 'https://world.taobao.com/'
    },
    {
        img: shopee_logo,
        title: '蝦皮',
        href: 'https://shopee.tw/'
    },
];

const MainPage = () => {
    const handleTo = (e) => {
        const siteIndex = siteData.findIndex(site => site.title === e.target.alt);
        let href = siteData[siteIndex].href
        if (href) window.open(href,'_blank')
    }

    const boardRef = useRef(null);

    const handleScrollDown = () => {
        console.log(boardRef.current)
        boardRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const handleScrollUp = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className='mainPageContainer' loading="lazy">
            <div className='container' >
                <div className="container_content">
                    <div class="par">
                        <section class="title35">
                            <h2>
                                <span>
                                    Welcome to
                                    <br />
                                    ~~~BetterLinkTree
                                </span>
                            </h2>
                        </section>
                        <div class='title42'>
                            {/* change title */}
                            <p>1. Log in and establish your personal account</p>
                            <p>2. Add your personal shopping list in new addition</p>
                            <p>3. See your shopping list in collection</p>
                            <p>4. See others collection in following</p>
                            <p>5. Use filter to see your merchandise</p>
                        </div>
                    </div>
                    <div class="btns">
                        <section id="section_arrow" class="demo" onClick={handleScrollDown}>
                            <a href="#board">
                                <button class='btns_e-commence_more' >
                                    e-commence store
                                    <span></span>
                                </button>
                            </a>
                        </section>
                    </div>
                </div>
                <div class="container_outer_img">
                    <img src={shoppingMall} />
                </div>
            </div>
            <div id='board' ref={boardRef}>
                <Stack sx={{ paddingBottom: '1vh', paddingLeft: '1vw' }}>
                    <div className='cart'>
                        <img id='cartImg' src={cart} />
                    </div>
                </Stack>
                <Stack
                    sx={{ width: '60vw', height: '90vh', paddingLeft: '3vw', alignContent: 'flex-end', justifyContent: 'center' }}>
                    <h2> Here are e-commence websites </h2>
                    Browse through commence stores and add favorite to your collection list
                    <ImageList
                        cols={4}
                        sx={{
                            margin: 0,
                            width: '60vw',
                            height: '60vh',
                            // backgroundColor: 'gray',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-evenly',
                            alignItems: 'center'
                        }}
                    >
                        {siteData.map((item) => (
                            <ImageListItem
                                key={item.img}
                                onClick={handleTo}
                                cols={1}
                                style={{
                                    width: '12vw',
                                    height: '12vw',
                                }}
                            >
                                <img
                                    className='logo'
                                    src={`${item.img}?w=248&fit=crop&auto=format`}
                                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.title}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Stack>
            </div>
            <div class='mainPage_bottom' id='section_arrow_up'>
                <button class='btns_topButton_more' onClick={handleScrollUp} > Top Button</button>
            </div>
        </div >
    )
}

export default MainPage;
