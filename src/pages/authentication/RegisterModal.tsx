import React, { FunctionComponent, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { IModalModel } from './Modal';

const RegisterModal: FunctionComponent<IModalModel> = ({ showModal }) => {
  const [inputs, setInputs] = useState([{ it: false }, { it: false }, { it: false }, { it: false }, { it: false }]);

  function isTypingToggle(e: any, index: any, isFirst: any) {
    if (e.target.value.length === 0 || (e.target.value.length > 0 && isFirst)) {
      let inputsTemp = [...inputs];
      let temp_element = { ...inputsTemp[index] };
      temp_element.it = !temp_element.it;
      inputsTemp[index] = temp_element;
      setInputs(inputsTemp);
    }
  }

  return (
    <>
      <div
        className={`menu menu-box-bottom menu-box-detached rounded-m ${showModal ? 'menu-active' : ''}`}
        data-menu-height="485"
        style={{ display: 'inherit' }}
        data-menu-effect="menu-over"
      >
        <div className="card p-4" style={{ marginBottom: '0px' }}>
          <div className={`input-style has-borders no-icon validate-field mb-4 ${inputs[0].it ? 'input-style-active' : ''}`}>
            <input
              onChange={(e) => isTypingToggle(e, 0, !inputs[0].it)}
              type="tel"
              className="form-control validate-text"
              id="form4"
              placeholder="نام کاربری (شماره موبایل)"
            />
            <label htmlFor="form4" className="color-highlight">
              نام کاربری (شماره موبایل)
            </label>
            <i className={`fa fa-times disabled invalid color-red-dark ${inputs[0].it ? 'disabled' : ''}`} />
            <i className="fa fa-check disabled valid color-green-dark" />
            <em className={`${inputs[0].it ? 'disabled' : ''}`}>(اجباری)</em>
          </div>

          <Container style={{ maxWidth: '100%', margin: '4px 0 10px 0', padding: '0 0 0 0' }}>
            <Row
              style={{
                alignItems: 'center',
                textAlign: 'center',
                padding: '0 0 0 0',
                marginBottom: '0',
              }}
            >
              <Col style={{ textAlign: 'right', padding: '0 12px 0 2px' }}>
                <div className="form-check icon-check">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" value="" id="radio1" />
                  <label className="form-check-label" htmlFor="radio1">
                    آقا
                  </label>
                  <i className="icon-check-1 far fa-circle color-gray-dark font-16" />
                  <i className="icon-check-2 far fa-check-circle font-16 color-highlight" />
                </div>
              </Col>
              <Col style={{ textAlign: 'right', padding: '0 2px 0 12px' }}>
                <div className="form-check icon-check">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" value="" id="radio2" />
                  <label className="form-check-label" htmlFor="radio2">
                    خانم
                  </label>
                  <i className="icon-check-1 far fa-circle color-gray-dark font-16" />
                  <i className="icon-check-2 far fa-check-circle font-16 color-highlight" />
                </div>
              </Col>
            </Row>
          </Container>

          <div className={`input-style has-borders no-icon validate-field mb-4 ${inputs[1].it ? 'input-style-active' : ''}`}>
            <input
              onChange={(e) => isTypingToggle(e, 1, !inputs[1].it)}
              type="tel"
              className="form-control validate-text"
              id="form4"
              placeholder="نام"
            />
            <label htmlFor="form4" className="color-highlight">
              نام
            </label>
            <i className={`fa fa-times disabled invalid color-red-dark ${inputs[1].it ? 'disabled' : ''}`} />
            <i className="fa fa-check disabled valid color-green-dark" />
            <em className={`${inputs[1].it ? 'disabled' : ''}`}>(اجباری)</em>
          </div>

          <div className={`input-style has-borders no-icon validate-field mb-4 ${inputs[2].it ? 'input-style-active' : ''}`}>
            <input
              onChange={(e) => isTypingToggle(e, 2, !inputs[2].it)}
              type="tel"
              className="form-control validate-text"
              id="form4"
              placeholder="نام خانوادگی"
            />
            <label htmlFor="form4" className="color-highlight">
              نام خانوادگی
            </label>
            <i className={`fa fa-times disabled invalid color-red-dark ${inputs[2].it ? 'disabled' : ''}`} />
            <i className="fa fa-check disabled valid color-green-dark" />
            <em className={`${inputs[2].it ? 'disabled' : ''}`}>(اجباری)</em>
          </div>

          <div className={`input-style has-borders no-icon validate-field mb-4 ${inputs[3].it ? 'input-style-active' : ''}`}>
            <input
              onChange={(e) => isTypingToggle(e, 3, !inputs[3].it)}
              type="tel"
              className="form-control validate-text"
              id="form4"
              placeholder="رمز ورود"
            />
            <label htmlFor="form4" className="color-highlight">
              رمز ورود
            </label>
            <i className={`fa fa-times disabled invalid color-red-dark ${inputs[3].it ? 'disabled' : ''}`} />
            <i className="fa fa-check disabled valid color-green-dark" />
            <em className={`${inputs[3].it ? 'disabled' : ''}`}>(اجباری)</em>
          </div>

          <div className={`input-style has-borders no-icon validate-field mb-4 ${inputs[4].it ? 'input-style-active' : ''}`}>
            <input
              onChange={(e) => isTypingToggle(e, 4, !inputs[4].it)}
              type="tel"
              className="form-control validate-text"
              id="form4"
              placeholder="تکرار رمز ورود"
            />
            <label htmlFor="form4" className="color-highlight">
              تکرار رمز ورود
            </label>
            <i className={`fa fa-times disabled invalid color-red-dark ${inputs[4].it ? 'disabled' : ''}`} />
            <i className="fa fa-check disabled valid color-green-dark" />
            <em className={`${inputs[4].it ? 'disabled' : ''}`}>(اجباری)</em>
          </div>

          <div
            style={{ marginTop: '10px' }}
            //   onClick={(e) => hideRegisterModal(e)}
            className="btn btn-full rounded-sm shadow-l bg-highlight btn-m font-900 text-uppercase mb-0"
          >
            ثبت نام
          </div>
        </div>
      </div>
    </>
  );
};
export default RegisterModal;
