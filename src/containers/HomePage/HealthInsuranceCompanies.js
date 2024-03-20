import React, { Component } from 'react';
import styled from 'styled-components';
import times from 'lodash/times';
import Marquee from 'react-marquee-slider';
import { withSize } from 'react-sizeme';
import { nanoid } from 'nanoid';
import FullWidth from './FullWidth';

const Photo = styled.img`
    width: ${(props) => props.scale * 220}px;
    height: ${(props) => props.scale * 170}px;
    border-radius: 4px;
    box-shadow: 0 7px 20px 0 rgba(0, 0, 0, 0.12);
    object-fit: cover;
    object-position: top;

    margin-left: ${(props) => (props.offset === 'true' ? props.scale * 7 : props.scale * 87)}px;
    margin-right: ${(props) => (props.offset === 'true' ? props.scale * 80 : 0)}px;
`;

const photos = [
    'https://bernard.vn/static/548/2022/06/18/baohiem3.png',
    'https://bernard.vn/static/1218/2022/11/23/Pacific 1.jpg',
    'https://bernard.vn/static/551/2022/06/18/baohiem_insmart.png',
    'https://bernard.vn/static/549/2022/06/18/baohiem4.png',
    'https://bernard.vn/static/1216/2022/11/23/Bic 1.jpg',
    'https://benhvienbacha.vn/wp-content/uploads/2023/06/17.-atacc.png',
    'https://bernard.vn/static/1215/2022/11/23/Mic 1.jpg',
    'https://i.pinimg.com/originals/20/82/67/208267d8d40eb9bf7d9adb2e050c6cd6.png',
    'https://yt3.googleusercontent.com/ytc/AIdro_msl7h5JzBf854tp4dmvwBYjsuMeOeMjSPPdHk=s900-c-k-c0x00ffffff-no-rj',
    'https://www.senviet.art/wp-content/uploads/edd/2017/08/prudential1.jpg',
    'https://inkythuatso.com/uploads/images/2021/11/logo-manulife-inkythuatso-01-16-14-48-52.jpg',
    'https://hrchannels.com/Upload/avatar/20210914/104336483_Chubb-Logo-Vector-Free-Download.jpg',
    'https://www.globalsafe.vn/noidung/uploads/2017/10/thiet-ke-logo-baoviet.png',
    'https://inkythuatso.com/uploads/thumbnails/800/2021/12/logo-fwd-inkythuatso-01-13-16-49-51.jpg',
];

class HealthInsuranceCompanies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: nanoid(),
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.size.width !== this.props.size.width) {
            this.setState({ key: nanoid() });
        }
    }

    render() {
        const { size } = this.props;
        const { key } = this.state;

        let scale = 0.5;

        if (size && size.width > 800) {
            scale = 0.65;
        }

        if (size && size.width > 1100) {
            scale = 0.8;
        }

        if (size && size.width > 1400) {
            scale = 1;
        }

        return (
            <div style={{ marginTop: '50px' }}>
                <FullWidth>
                    <span style={{ fontSize: '18px', fontWeight: 600, marginLeft: '100px' }}>BẢO HIỂM LIÊN KẾT</span>
                    <div style={{ height: scale * 150, marginTop: '30px' }}>
                        <Marquee key={key} velocity={25}>
                            {times(7, Number).map((id) => (
                                <Photo src={photos[id]} alt="" key={`marquee-example-people-${id}`} scale={scale} />
                            ))}
                        </Marquee>
                    </div>

                    <div style={{ height: scale * 60 }} />

                    <div style={{ height: scale * 200 }}>
                        <Marquee key={key} velocity={25}>
                            {times(7, Number).map((id) => (
                                <Photo
                                    src={photos[id + 7]}
                                    alt=""
                                    key={`marquee-example-people-${id + 7}`}
                                    offset="true"
                                    scale={scale}
                                />
                            ))}
                        </Marquee>
                    </div>
                </FullWidth>
            </div>
        );
    }
}

export default withSize()(HealthInsuranceCompanies);
