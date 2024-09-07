import { ofetch }  from 'ofetch';

export const externalFetch = ofetch.create({
  headers: {
    'Accept': '*/*',
  }
})