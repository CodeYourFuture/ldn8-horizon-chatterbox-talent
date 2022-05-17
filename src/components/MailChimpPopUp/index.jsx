import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import toQueryString from "to-querystring";
import jsonp from "jsonp";
import { ClipLoader } from 'react-spinners';

const BackgroundWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5000;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`

const Wrapper = styled.div`
    width: 50vw;
    height: 65vh;
    background-color: #FFF;
    padding: 1vw 2vw;
    display: flex;
    justify-content: space-between;
    position: relative;
`

const ContentWrapper = styled.div`
    display: flex;
    height: 100%;
    width: 50%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;

    h3 {
        font-weight: 200;
        font-size: 2.2em;
        line-height: 1.2em;
    }

    fieldset {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        width: 100%;

        input {
            padding: 0.5em 0.8em;
            border: 1px solid gray;
            font-size: 1.2em;
        }
    }

    p {
        font-weight: 300;
        letter-spacing: 0.2px;
        line-height: 1.2em;
    }
`

const ImageWrapper = styled.div`
    background-image: url("https://mcusercontent.com/cc97cbe1c1989bcac00c4ba4a/images/096c4b6d-5e1f-a235-a607-9f555f01ca74.png"); 
    width: 40%; 
    height: 100%; 
    background-repeat: no-repeat; 
    background-size: contain; 
    background-position: center center;
`

const SubscribeButton = styled.button`
    border: none;
    outline: none;
    background-color: black;
    color: white;
    font-weight: 700;
    padding: 1em 2.5em;
    border-radius: 5px;

    &:hover {
        opacity: 0.85;
    }
`

const CloseButton = styled.button`
    background-color: transparent;
    outline: none;
    border: none;
    font-weight: 700;
    position: absolute;
    right: 3%;
    top: 3%;
    padding: 0.4em 0.6em;

    &:hover {
        background-color: #000;
        color: #FFF;
        border-radius: 50%;
    }
`

const MailChimPopUp = ({ onSuccess, onClose }) => {
    const [email, setEmail] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isSuccess) onSuccess();
    }, [isSuccess])

    const handleEmailInput = (evt) => {
        const target = evt.target;
        const value = target.value;
        setEmail(value);
    }

    const handleUserClose = (evt) => {
        evt.stopPropagation();
        onClose();
    }

    // https://chatterbox.us17.list-manage.com/subscribe/post-json?u=cc97cbe1c1989bcac00c4ba4a&id=18dda6dfb3&c=jQuery19006619638440281914_1652798485675&EMAIL=otavio%40chatterbox.io&interestgroup_field=&gdpr%5B90226%5D=Y&b_cc97cbe1c1989bcac00c4ba4a_18dda6dfb3=&subscribe=Subscribe&_=1652798485676

    const handleSubscription = () => {
        const mailchimpUrl = 'https://chatterbox.us17.list-manage.com/subscribe/post-json?u=cc97cbe1c1989bcac00c4ba4a&id=18dda6dfb3';
        const getAjaxUrl = url => url.replace("/post?", "/post-json?");
        const params = toQueryString({ "EMAIL": email });
        const url = getAjaxUrl(mailchimpUrl) + "&" + params;
        setIsLoading(true);

        jsonp(
            url,
            { param: 'c'},
            (err) => {
                setIsLoading(false);
                if (err) return setError(err);
                return setIsSuccess(true);
            }
        )
    }

    return (
        <BackgroundWrapper>
            <Wrapper>
                <ContentWrapper>
                    <h3>Get updates from Chatterbox Talent</h3>
                    <fieldset>
                        <label htmlFor='email'>Email *</label>
                        <input id='email' type="email" name="EMAIL" value={email} onChange={handleEmailInput}/>
                    </fieldset>
                    {
                        isLoading
                        ? <ClipLoader />
                        : <SubscribeButton onClick={handleSubscription}>Susbcribe</SubscribeButton>
                    }
                    <p>By subscribing you are agreeing to receiving updates from Chatterbox Talent. You can unsubscribe at any time.</p>
                </ContentWrapper>
                <ImageWrapper/>
                <CloseButton onClick={handleUserClose}>X</CloseButton>
            </Wrapper>
        </BackgroundWrapper>
    )
}

export default MailChimPopUp;