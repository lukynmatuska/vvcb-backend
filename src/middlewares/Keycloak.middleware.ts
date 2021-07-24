import {Context, IMiddleware, Inject, Middleware} from '@tsed/common';
import {KeycloakAuthOptions} from '../decorators/KeycloakAuthOptions.decorator';
import {KeycloakService} from '../services/Keycloak.service';

@Middleware()
export class KeycloakMiddleware implements IMiddleware {

    @Inject()
    keycloakService: KeycloakService;

    public use(@Context() ctx: Context) {
        const options: KeycloakAuthOptions = ctx.endpoint.store.get(KeycloakMiddleware);
        const keycloak = this.keycloakService.getKeycloakInstance();
        if (ctx.getRequest().kauth.grant) {
          this.keycloakService.setToken(ctx.getRequest().kauth.grant.access_token);
        }
        return keycloak.protect(options.role);
    }
}