import { IPageProps } from '@src/configs/routerConfig/IPageProps';
import { FunctionComponent } from 'react';

const TechnicianProfile: FunctionComponent<IPageProps> = () => {
  return (
    <>
      <body
        style={{
          fontSize: '100%',
          overflowX: 'hidden',
          backgroundColor: 'rgb(238, 238, 238)',
        }}
      >
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <section style={{ borderRadius: '10px', width: '95%', height: '80%', backgroundColor: 'aliceblue' }}>
            <div className="" style={{ padding: '10px 0', display: 'flex' }}>
              <div>
                <figure style={{ margin: 0 }}>
                  <img src="asset/img/profile.png" alt="" />
                </figure>
              </div>
              <div>
                <p style={{ marginBottom: 0 }}>حسن عباسی</p>
                <p style={{ marginBottom: 0 }}>09123456789</p>
              </div>
            </div>
            <div className="">
              <div className="">وضعیت:</div>
              <div className="">
                <span>
                  <p style={{ marginBottom: 0 }}>فعال</p>
                  <span></span>
                </span>
              </div>
            </div>
            <div className="">
              <div>
                <div className="">1.780.000 تومان</div>
                <div className="">درآمد شما از کاردون</div>
              </div>
            </div>
            <div className="">
              <div className="">
                <div className="">
                  <div>485</div>
                  <div>روز در کاردون</div>
                </div>
                <div className="">
                  <div>155</div>
                  <div>ماموریت موفق</div>
                </div>
                <div className="">
                  <div>%85</div>
                  <div>رضایت مشتری</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </body>
    </>
  );
};

export default TechnicianProfile;
