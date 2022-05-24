import { IJwtConfig } from '@src/configs/jwt/IJwtConfig.js';
import jwtDefaultConfig from '@src/configs/jwt/jwtDefaultConfig';
import { useAxios } from '../useAxios';
import { useTokenAuthentication } from '../useTokenAuthentication';
import { useNavigate } from 'react-router-dom';
import { URL_LOGIN } from '@src/configs/urls';

export default class JwtService {
  jwtConfig: IJwtConfig = { ...jwtDefaultConfig };

  constructor(jwtOverrideConfig: IJwtConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig };
  }
}
