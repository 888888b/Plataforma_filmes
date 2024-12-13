import styled from "styled-components";

export const HeaderSlides = styled.div`
    width: 100%;
    height: auto;
    position: relative;

    @keyframes FadeIn {
        from { opacity: 0 }
        to { opacity: 1 }   
    }

    animation: FadeIn .2s linear;

    & .overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 10;
        background-image: linear-gradient( to top, #020515, #020515, rgba(2, 5, 21, 0.3), transparent);
    }

    & .header-slides-next {
        display: none;
        width: 150px;
        height: 150px;
        transform: translate(20px, -50%);
        background-image: radial-gradient(circle, #020515, transparent, transparent);
    }

    & .header-slides-prev {
        display: none;
        width: 150px;
        height: 150px;
        transform: translate(-20px, -50%);
        background-image: radial-gradient(circle, #020515, transparent, transparent);
    }

    @media screen and ( width >= 768px ) {
        background-color: #16142B;
        margin-top: 80px;
        
        & .overlay {
            left: 50%;
            width: 90px;
            transform: translateX(-50%);
            background-image: linear-gradient( to right, #16142B, #16142B, transparent);
        }

        & .slide-container::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 50vw;
            height: 100%;
            background-image: linear-gradient( to right, #16142B, transparent);
            z-index: 12;
        }

        &:hover .header-slides-next {
            display: flex;
        }

        &:hover .header-slides-prev {
            display: flex;
        }
    }

    @media screen and ( width >= 1024px ) {
        & .second-overlay {
            width: 800px;
            background-image: linear-gradient( to right, #020515, rgba(2, 5, 21, 0.5), transparent);   
        }
    }

    & .swiper-pagination-bullet, .swiper-pagination-bullet-active {
        --swiper-pagination-bullet-size: 8px;
        --swiper-pagination-color: white;
        --swiper-pagination-bullet-inactive-color: white;
    }
`;
