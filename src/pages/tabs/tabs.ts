import { Component } from '@angular/core';

import { ChatsPage } from '../chats/chats';
import { GroupsPage } from '../groups/groups';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1 = ChatsPage;
  tab2 = GroupsPage;
  tab3 = ProfilePage;

  constructor() {
  }

}
