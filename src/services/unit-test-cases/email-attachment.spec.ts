import 'jasmine';
import { ResponseData } from '../..';
import { ClientConfig } from '../../service-models/client-config';
import { EmailClient } from '../email-client';
import { TestClientConfig as c } from '../test-client-config';
import { Email } from './../../../lib/compass-models/email/email.d';

describe("EmailAtachmentClient", () => {

  let emailClient: EmailClient = new EmailClient(new ClientConfig(c.firmId, c.username, c.password, c.apiKey, c.compassUrl));
  let aValidEmailId: number;

  beforeEach(async () => {
    emailClient.config.firmId = c.firmId;
    emailClient.config.username = c.username;
    emailClient.config.password = c.password;
    emailClient.config.apiKey = c.apiKey;
    emailClient.config.compassUrl = c.compassUrl;

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    let emails: ResponseData < Email[] > = await emailClient.get < Email[] > ('/emails');
    if (emails.success) aValidEmailId = emails.result[0].Id;
  });

  it("Can add attachments to an email", async () => {
    let attachments: string[] = [
      ""
    ];

    let res: ResponseData < any > = await emailClient.addAttachment < any > (aValidEmailId, attachments);
    expect(res.success).toBeTruthy(res.message);
  });
});
