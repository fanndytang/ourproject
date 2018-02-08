let quillcss =
  '<style type="text/css">' +
  '.my-frame-text {width: 100vw;height:auto;}' + '\n' +
  '.my-frame-text img{max-width:100%;display:block;margin-left:auto;margin-right:auto;}' + '\n' +
  '.my-frame-text li.list-cn-1-1:before {content: \'一\'}\n' +
  '.my-frame-text li.list-cn-1-2:before {content: \'二\'}\n' +
  '.my-frame-text li.list-cn-1-3:before {content: \'三\'}\n' +
  '.my-frame-text li.list-cn-1-4:before {content: \'四\'}\n' +
  '.my-frame-text li.list-cn-1-5:before {content: \'五\'}\n' +
  '.my-frame-text li.list-cn-1-6:before {content: \'六\'}\n' +
  '.my-frame-text li.list-cn-1-7:before {content: \'七\'}\n' +
  '.my-frame-text li.list-cn-1-8:before {content: \'八\'}\n' +
  '.my-frame-text li.list-cn-1-9:before {content: \'九\'}\n' +
  '.my-frame-text li.list-cn-1-10:before {content: \'十\'}\n' +
  '.my-frame-text li.list-cn-1-11:before {content: \'十一\'}\n' +
  '.my-frame-text li.list-cn-1-12:before {content: \'十二\'}\n' +
  '.my-frame-text li.list-cn-1-13:before {content: \'十三\'}\n' +
  '.my-frame-text li.list-cn-1-14:before {content: \'十四\'}\n' +
  '.my-frame-text li.list-cn-1-15:before {content: \'十五\'}\n' +
  '.my-frame-text li.list-cn-1-16:before {content: \'十六\'}\n' +
  '.my-frame-text li.list-cn-1-17:before {content: \'十七\'}\n' +
  '.my-frame-text li.list-cn-1-18:before {content: \'十八\'}\n' +
  '.my-frame-text li.list-cn-1-19:before {content: \'十九\'}\n' +
  '.my-frame-text li.list-cn-1-20:before {content: \'二十\'}\n' +
  '.my-frame-text li.list-cn-1-21:before {content: \'二十一\'}\n' +
  '.my-frame-text li.list-cn-1-22:before {content: \'二十二\'}\n' +
  '.my-frame-text li.list-cn-1-23:before {content: \'二十三\'}\n' +
  '.my-frame-text li.list-cn-1-24:before {content: \'二十四\'}\n' +
  '.my-frame-text li.list-cn-1-25:before {content: \'二十五\'}\n' +
  '.my-frame-text li.list-cn-1-26:before {content: \'二十六\'}\n' +
  '.my-frame-text li.list-cn-1-27:before {content: \'二十七\'}\n' +
  '.my-frame-text li.list-cn-1-28:before {content: \'二十八\'}\n' +
  '.my-frame-text li.list-cn-1-29:before {content: \'二十九\'}\n' +
  '.my-frame-text li.list-cn-1-30:before {content: \'三十\'}\n' +
  '.my-frame-text li.list-cn-1-31:before {content: \'三十一\'}\n' +
  '.my-frame-text li.list-cn-1-32:before {content: \'三十二\'}\n' +
  '.my-frame-text li.list-cn-1-33:before {content: \'三十三\'}\n' +
  '.my-frame-text li.list-cn-1-34:before {content: \'三十四\'}\n' +
  '.my-frame-text li.list-cn-1-35:before {content: \'三十五\'}\n' +
  '.my-frame-text li.list-cn-1-36:before {content: \'三十六\'}\n' +
  '.my-frame-text li.list-cn-1-37:before {content: \'三十七\'}\n' +
  '.my-frame-text li.list-cn-1-38:before {content: \'三十八\'}\n' +
  '.my-frame-text li.list-cn-1-39:before {content: \'三十九\'}\n' +
  '.my-frame-text li.list-cn-1-40:before {content: \'四十\'}\n' +
  '.my-frame-text li.list-cn-1-41:before {content: \'四十一\'}\n' +
  '.my-frame-text li.list-cn-1-42:before {content: \'四十二\'}\n' +
  '.my-frame-text li.list-cn-1-43:before {content: \'四十三\'}\n' +
  '.my-frame-text li.list-cn-1-44:before {content: \'四十四\'}\n' +
  '.my-frame-text li.list-cn-1-45:before {content: \'四十五\'}\n' +
  '.my-frame-text li.list-cn-1-46:before {content: \'四十六\'}\n' +
  '.my-frame-text li.list-cn-1-47:before {content: \'四十七\'}\n' +
  '.my-frame-text li.list-cn-1-48:before {content: \'四十八\'}\n' +
  '.my-frame-text li.list-cn-1-49:before {content: \'四十九\'}\n' +
  '.my-frame-text li.list-cn-1-50:before {content: \'五十\'}\n' +
  '.my-frame-text li.list-cn-1-51:before {content: \'五十一\'}\n' +
  '.my-frame-text li.list-cn-1-52:before {content: \'五十二\'}\n' +
  '.my-frame-text li.list-cn-1-53:before {content: \'五十三\'}\n' +
  '.my-frame-text li.list-cn-1-54:before {content: \'五十四\'}\n' +
  '.my-frame-text li.list-cn-1-55:before {content: \'五十五\'}\n' +
  '.my-frame-text li.list-cn-1-56:before {content: \'五十六\'}\n' +
  '.my-frame-text li.list-cn-1-57:before {content: \'五十七\'}\n' +
  '.my-frame-text li.list-cn-1-58:before {content: \'五十八\'}\n' +
  '.my-frame-text li.list-cn-1-59:before {content: \'五十九\'}\n' +
  '.my-frame-text li.list-cn-1-60:before {content: \'六十\'}\n' +
  '.my-frame-text li.list-cn-1-61:before {content: \'六十一\'}\n' +
  '.my-frame-text li.list-cn-1-62:before {content: \'六十二\'}\n' +
  '.my-frame-text li.list-cn-1-63:before {content: \'六十三\'}\n' +
  '.my-frame-text li.list-cn-1-64:before {content: \'六十四\'}\n' +
  '.my-frame-text li.list-cn-1-65:before {content: \'六十五\'}\n' +
  '.my-frame-text li.list-cn-1-66:before {content: \'六十六\'}\n' +
  '.my-frame-text li.list-cn-1-67:before {content: \'六十七\'}\n' +
  '.my-frame-text li.list-cn-1-68:before {content: \'六十八\'}\n' +
  '.my-frame-text li.list-cn-1-69:before {content: \'六十九\'}\n' +
  '.my-frame-text li.list-cn-1-70:before {content: \'七十\'}\n' +
  '.my-frame-text li.list-cn-1-71:before {content: \'七十一\'}\n' +
  '.my-frame-text li.list-cn-1-72:before {content: \'七十二\'}\n' +
  '.my-frame-text li.list-cn-1-73:before {content: \'七十三\'}\n' +
  '.my-frame-text li.list-cn-1-74:before {content: \'七十四\'}\n' +
  '.my-frame-text li.list-cn-1-75:before {content: \'七十五\'}\n' +
  '.my-frame-text li.list-cn-1-76:before {content: \'七十六\'}\n' +
  '.my-frame-text li.list-cn-1-77:before {content: \'七十七\'}\n' +
  '.my-frame-text li.list-cn-1-78:before {content: \'七十八\'}\n' +
  '.my-frame-text li.list-cn-1-79:before {content: \'七十九\'}\n' +
  '.my-frame-text li.list-cn-1-80:before {content: \'八十\'}\n' +
  '.my-frame-text li.list-cn-1-81:before {content: \'八十一\'}\n' +
  '.my-frame-text li.list-cn-1-82:before {content: \'八十二\'}\n' +
  '.my-frame-text li.list-cn-1-83:before {content: \'八十三\'}\n' +
  '.my-frame-text li.list-cn-1-84:before {content: \'八十四\'}\n' +
  '.my-frame-text li.list-cn-1-85:before {content: \'八十五\'}\n' +
  '.my-frame-text li.list-cn-1-86:before {content: \'八十六\'}\n' +
  '.my-frame-text li.list-cn-1-87:before {content: \'八十七\'}\n' +
  '.my-frame-text li.list-cn-1-88:before {content: \'八十八\'}\n' +
  '.my-frame-text li.list-cn-1-89:before {content: \'八十九\'}\n' +
  '.my-frame-text li.list-cn-1-90:before {content: \'九十\'}\n' +
  '.my-frame-text li.list-cn-1-91:before {content: \'九十一\'}\n' +
  '.my-frame-text li.list-cn-1-92:before {content: \'九十二\'}\n' +
  '.my-frame-text li.list-cn-1-93:before {content: \'九十三\'}\n' +
  '.my-frame-text li.list-cn-1-94:before {content: \'九十四\'}\n' +
  '.my-frame-text li.list-cn-1-95:before {content: \'九十五\'}\n' +
  '.my-frame-text li.list-cn-1-96:before {content: \'九十六\'}\n' +
  '.my-frame-text li.list-cn-1-97:before {content: \'九十七\'}\n' +
  '.my-frame-text li.list-cn-1-98:before {content: \'九十八\'}\n' +
  '\n' +
  '\n' +
  '.my-frame-text li.list-cn-2-1:before {content: \'一）\'}\n' +
  '.my-frame-text li.list-cn-2-2:before {content: \'二）\'}\n' +
  '.my-frame-text li.list-cn-2-3:before {content: \'三）\'}\n' +
  '.my-frame-text li.list-cn-2-4:before {content: \'四）\'}\n' +
  '.my-frame-text li.list-cn-2-5:before {content: \'五）\'}\n' +
  '.my-frame-text li.list-cn-2-6:before {content: \'六）\'}\n' +
  '.my-frame-text li.list-cn-2-7:before {content: \'七）\'}\n' +
  '.my-frame-text li.list-cn-2-8:before {content: \'八）\'}\n' +
  '.my-frame-text li.list-cn-2-9:before {content: \'九）\'}\n' +
  '.my-frame-text li.list-cn-2-10:before {content: \'十）\'}\n' +
  '.my-frame-text li.list-cn-2-11:before {content: \'十一）\'}\n' +
  '.my-frame-text li.list-cn-2-12:before {content: \'十二）\'}\n' +
  '.my-frame-text li.list-cn-2-13:before {content: \'十三）\'}\n' +
  '.my-frame-text li.list-cn-2-14:before {content: \'十四）\'}\n' +
  '.my-frame-text li.list-cn-2-15:before {content: \'十五）\'}\n' +
  '.my-frame-text li.list-cn-2-16:before {content: \'十六）\'}\n' +
  '.my-frame-text li.list-cn-2-17:before {content: \'十七）\'}\n' +
  '.my-frame-text li.list-cn-2-18:before {content: \'十八）\'}\n' +
  '.my-frame-text li.list-cn-2-19:before {content: \'十九）\'}\n' +
  '.my-frame-text li.list-cn-2-20:before {content: \'二十）\'}\n' +
  '.my-frame-text li.list-cn-2-21:before {content: \'二十一）\'}\n' +
  '.my-frame-text li.list-cn-2-22:before {content: \'二十二）\'}\n' +
  '.my-frame-text li.list-cn-2-23:before {content: \'二十三）\'}\n' +
  '.my-frame-text li.list-cn-2-24:before {content: \'二十四）\'}\n' +
  '.my-frame-text li.list-cn-2-25:before {content: \'二十五）\'}\n' +
  '.my-frame-text li.list-cn-2-26:before {content: \'二十六）\'}\n' +
  '.my-frame-text li.list-cn-2-27:before {content: \'二十七）\'}\n' +
  '.my-frame-text li.list-cn-2-28:before {content: \'二十八）\'}\n' +
  '.my-frame-text li.list-cn-2-29:before {content: \'二十九）\'}\n' +
  '.my-frame-text li.list-cn-2-30:before {content: \'三十）\'}\n' +
  '.my-frame-text li.list-cn-2-31:before {content: \'三十一）\'}\n' +
  '.my-frame-text li.list-cn-2-32:before {content: \'三十二）\'}\n' +
  '.my-frame-text li.list-cn-2-33:before {content: \'三十三）\'}\n' +
  '.my-frame-text li.list-cn-2-34:before {content: \'三十四）\'}\n' +
  '.my-frame-text li.list-cn-2-35:before {content: \'三十五）\'}\n' +
  '.my-frame-text li.list-cn-2-36:before {content: \'三十六）\'}\n' +
  '.my-frame-text li.list-cn-2-37:before {content: \'三十七）\'}\n' +
  '.my-frame-text li.list-cn-2-38:before {content: \'三十八）\'}\n' +
  '.my-frame-text li.list-cn-2-39:before {content: \'三十九）\'}\n' +
  '.my-frame-text li.list-cn-2-40:before {content: \'四十）\'}\n' +
  '.my-frame-text li.list-cn-2-41:before {content: \'四十一）\'}\n' +
  '.my-frame-text li.list-cn-2-42:before {content: \'四十二）\'}\n' +
  '.my-frame-text li.list-cn-2-43:before {content: \'四十三）\'}\n' +
  '.my-frame-text li.list-cn-2-44:before {content: \'四十四）\'}\n' +
  '.my-frame-text li.list-cn-2-45:before {content: \'四十五）\'}\n' +
  '.my-frame-text li.list-cn-2-46:before {content: \'四十六）\'}\n' +
  '.my-frame-text li.list-cn-2-47:before {content: \'四十七）\'}\n' +
  '.my-frame-text li.list-cn-2-48:before {content: \'四十八）\'}\n' +
  '.my-frame-text li.list-cn-2-49:before {content: \'四十九）\'}\n' +
  '.my-frame-text li.list-cn-2-50:before {content: \'五十）\'}\n' +
  '.my-frame-text li.list-cn-2-51:before {content: \'五十一）\'}\n' +
  '.my-frame-text li.list-cn-2-52:before {content: \'五十二）\'}\n' +
  '.my-frame-text li.list-cn-2-53:before {content: \'五十三）\'}\n' +
  '.my-frame-text li.list-cn-2-54:before {content: \'五十四）\'}\n' +
  '.my-frame-text li.list-cn-2-55:before {content: \'五十五）\'}\n' +
  '.my-frame-text li.list-cn-2-56:before {content: \'五十六）\'}\n' +
  '.my-frame-text li.list-cn-2-57:before {content: \'五十七）\'}\n' +
  '.my-frame-text li.list-cn-2-58:before {content: \'五十八）\'}\n' +
  '.my-frame-text li.list-cn-2-59:before {content: \'五十九）\'}\n' +
  '.my-frame-text li.list-cn-2-60:before {content: \'六十）\'}\n' +
  '.my-frame-text li.list-cn-2-61:before {content: \'六十一）\'}\n' +
  '.my-frame-text li.list-cn-2-62:before {content: \'六十二）\'}\n' +
  '.my-frame-text li.list-cn-2-63:before {content: \'六十三）\'}\n' +
  '.my-frame-text li.list-cn-2-64:before {content: \'六十四）\'}\n' +
  '.my-frame-text li.list-cn-2-65:before {content: \'六十五）\'}\n' +
  '.my-frame-text li.list-cn-2-66:before {content: \'六十六）\'}\n' +
  '.my-frame-text li.list-cn-2-67:before {content: \'六十七）\'}\n' +
  '.my-frame-text li.list-cn-2-68:before {content: \'六十八）\'}\n' +
  '.my-frame-text li.list-cn-2-69:before {content: \'六十九）\'}\n' +
  '.my-frame-text li.list-cn-2-70:before {content: \'七十）\'}\n' +
  '.my-frame-text li.list-cn-2-71:before {content: \'七十一）\'}\n' +
  '.my-frame-text li.list-cn-2-72:before {content: \'七十二）\'}\n' +
  '.my-frame-text li.list-cn-2-73:before {content: \'七十三）\'}\n' +
  '.my-frame-text li.list-cn-2-74:before {content: \'七十四）\'}\n' +
  '.my-frame-text li.list-cn-2-75:before {content: \'七十五）\'}\n' +
  '.my-frame-text li.list-cn-2-76:before {content: \'七十六）\'}\n' +
  '.my-frame-text li.list-cn-2-77:before {content: \'七十七）\'}\n' +
  '.my-frame-text li.list-cn-2-78:before {content: \'七十八）\'}\n' +
  '.my-frame-text li.list-cn-2-79:before {content: \'七十九）\'}\n' +
  '.my-frame-text li.list-cn-2-80:before {content: \'八十）\'}\n' +
  '.my-frame-text li.list-cn-2-81:before {content: \'八十一）\'}\n' +
  '.my-frame-text li.list-cn-2-82:before {content: \'八十二）\'}\n' +
  '.my-frame-text li.list-cn-2-83:before {content: \'八十三）\'}\n' +
  '.my-frame-text li.list-cn-2-84:before {content: \'八十四）\'}\n' +
  '.my-frame-text li.list-cn-2-85:before {content: \'八十五）\'}\n' +
  '.my-frame-text li.list-cn-2-86:before {content: \'八十六）\'}\n' +
  '.my-frame-text li.list-cn-2-87:before {content: \'八十七）\'}\n' +
  '.my-frame-text li.list-cn-2-88:before {content: \'八十八）\'}\n' +
  '.my-frame-text li.list-cn-2-89:before {content: \'八十九）\'}\n' +
  '.my-frame-text li.list-cn-2-90:before {content: \'九十）\'}\n' +
  '.my-frame-text li.list-cn-2-91:before {content: \'九十一）\'}\n' +
  '.my-frame-text li.list-cn-2-92:before {content: \'九十二）\'}\n' +
  '.my-frame-text li.list-cn-2-93:before {content: \'九十三）\'}\n' +
  '.my-frame-text li.list-cn-2-94:before {content: \'九十四）\'}\n' +
  '.my-frame-text li.list-cn-2-95:before {content: \'九十五）\'}\n' +
  '.my-frame-text li.list-cn-2-96:before {content: \'九十六）\'}\n' +
  '.my-frame-text li.list-cn-2-97:before {content: \'九十七）\'}\n' +
  '.my-frame-text li.list-cn-2-98:before {content: \'九十八）\'}\n' +
  '\n' +
  '.my-frame-text li.list-cn-3-1:before {content: \'（一）\'}\n' +
  '.my-frame-text li.list-cn-3-2:before {content: \'（二）\'}\n' +
  '.my-frame-text li.list-cn-3-3:before {content: \'（三）\'}\n' +
  '.my-frame-text li.list-cn-3-4:before {content: \'（四）\'}\n' +
  '.my-frame-text li.list-cn-3-5:before {content: \'（五）\'}\n' +
  '.my-frame-text li.list-cn-3-6:before {content: \'（六）\'}\n' +
  '.my-frame-text li.list-cn-3-7:before {content: \'（七）\'}\n' +
  '.my-frame-text li.list-cn-3-8:before {content: \'（八）\'}\n' +
  '.my-frame-text li.list-cn-3-9:before {content: \'（九）\'}\n' +
  '.my-frame-text li.list-cn-3-10:before {content: \'（十）\'}\n' +
  '.my-frame-text li.list-cn-3-11:before {content: \'（十一）\'}\n' +
  '.my-frame-text li.list-cn-3-12:before {content: \'（十二）\'}\n' +
  '.my-frame-text li.list-cn-3-13:before {content: \'（十三）\'}\n' +
  '.my-frame-text li.list-cn-3-14:before {content: \'（十四）\'}\n' +
  '.my-frame-text li.list-cn-3-15:before {content: \'（十五）\'}\n' +
  '.my-frame-text li.list-cn-3-16:before {content: \'（十六）\'}\n' +
  '.my-frame-text li.list-cn-3-17:before {content: \'（十七）\'}\n' +
  '.my-frame-text li.list-cn-3-18:before {content: \'（十八）\'}\n' +
  '.my-frame-text li.list-cn-3-19:before {content: \'（十九）\'}\n' +
  '.my-frame-text li.list-cn-3-20:before {content: \'（二十）\'}\n' +
  '.my-frame-text li.list-cn-3-21:before {content: \'（二十一）\'}\n' +
  '.my-frame-text li.list-cn-3-22:before {content: \'（二十二）\'}\n' +
  '.my-frame-text li.list-cn-3-23:before {content: \'（二十三）\'}\n' +
  '.my-frame-text li.list-cn-3-24:before {content: \'（二十四）\'}\n' +
  '.my-frame-text li.list-cn-3-25:before {content: \'（二十五）\'}\n' +
  '.my-frame-text li.list-cn-3-26:before {content: \'（二十六）\'}\n' +
  '.my-frame-text li.list-cn-3-27:before {content: \'（二十七）\'}\n' +
  '.my-frame-text li.list-cn-3-28:before {content: \'（二十八）\'}\n' +
  '.my-frame-text li.list-cn-3-29:before {content: \'（二十九）\'}\n' +
  '.my-frame-text li.list-cn-3-30:before {content: \'（三十）\'}\n' +
  '.my-frame-text li.list-cn-3-31:before {content: \'（三十一）\'}\n' +
  '.my-frame-text li.list-cn-3-32:before {content: \'（三十二）\'}\n' +
  '.my-frame-text li.list-cn-3-33:before {content: \'（三十三）\'}\n' +
  '.my-frame-text li.list-cn-3-34:before {content: \'（三十四）\'}\n' +
  '.my-frame-text li.list-cn-3-35:before {content: \'（三十五）\'}\n' +
  '.my-frame-text li.list-cn-3-36:before {content: \'（三十六）\'}\n' +
  '.my-frame-text li.list-cn-3-37:before {content: \'（三十七）\'}\n' +
  '.my-frame-text li.list-cn-3-38:before {content: \'（三十八）\'}\n' +
  '.my-frame-text li.list-cn-3-39:before {content: \'（三十九）\'}\n' +
  '.my-frame-text li.list-cn-3-40:before {content: \'（四十）\'}\n' +
  '.my-frame-text li.list-cn-3-41:before {content: \'（四十一）\'}\n' +
  '.my-frame-text li.list-cn-3-42:before {content: \'（四十二）\'}\n' +
  '.my-frame-text li.list-cn-3-43:before {content: \'（四十三）\'}\n' +
  '.my-frame-text li.list-cn-3-44:before {content: \'（四十四）\'}\n' +
  '.my-frame-text li.list-cn-3-45:before {content: \'（四十五）\'}\n' +
  '.my-frame-text li.list-cn-3-46:before {content: \'（四十六）\'}\n' +
  '.my-frame-text li.list-cn-3-47:before {content: \'（四十七）\'}\n' +
  '.my-frame-text li.list-cn-3-48:before {content: \'（四十八）\'}\n' +
  '.my-frame-text li.list-cn-3-49:before {content: \'（四十九）\'}\n' +
  '.my-frame-text li.list-cn-3-50:before {content: \'（五十）\'}\n' +
  '.my-frame-text li.list-cn-3-51:before {content: \'（五十一）\'}\n' +
  '.my-frame-text li.list-cn-3-52:before {content: \'（五十二）\'}\n' +
  '.my-frame-text li.list-cn-3-53:before {content: \'（五十三）\'}\n' +
  '.my-frame-text li.list-cn-3-54:before {content: \'（五十四）\'}\n' +
  '.my-frame-text li.list-cn-3-55:before {content: \'（五十五）\'}\n' +
  '.my-frame-text li.list-cn-3-56:before {content: \'（五十六）\'}\n' +
  '.my-frame-text li.list-cn-3-57:before {content: \'（五十七）\'}\n' +
  '.my-frame-text li.list-cn-3-58:before {content: \'（五十八）\'}\n' +
  '.my-frame-text li.list-cn-3-59:before {content: \'（五十九）\'}\n' +
  '.my-frame-text li.list-cn-3-60:before {content: \'（六十）\'}\n' +
  '.my-frame-text li.list-cn-3-61:before {content: \'（六十一）\'}\n' +
  '.my-frame-text li.list-cn-3-62:before {content: \'（六十二）\'}\n' +
  '.my-frame-text li.list-cn-3-63:before {content: \'（六十三）\'}\n' +
  '.my-frame-text li.list-cn-3-64:before {content: \'（六十四）\'}\n' +
  '.my-frame-text li.list-cn-3-65:before {content: \'（六十五）\'}\n' +
  '.my-frame-text li.list-cn-3-66:before {content: \'（六十六）\'}\n' +
  '.my-frame-text li.list-cn-3-67:before {content: \'（六十七）\'}\n' +
  '.my-frame-text li.list-cn-3-68:before {content: \'（六十八）\'}\n' +
  '.my-frame-text li.list-cn-3-69:before {content: \'（六十九）\'}\n' +
  '.my-frame-text li.list-cn-3-70:before {content: \'（七十）\'}\n' +
  '.my-frame-text li.list-cn-3-71:before {content: \'（七十一）\'}\n' +
  '.my-frame-text li.list-cn-3-72:before {content: \'（七十二）\'}\n' +
  '.my-frame-text li.list-cn-3-73:before {content: \'（七十三）\'}\n' +
  '.my-frame-text li.list-cn-3-74:before {content: \'（七十四）\'}\n' +
  '.my-frame-text li.list-cn-3-75:before {content: \'（七十五）\'}\n' +
  '.my-frame-text li.list-cn-3-76:before {content: \'（七十六）\'}\n' +
  '.my-frame-text li.list-cn-3-77:before {content: \'（七十七）\'}\n' +
  '.my-frame-text li.list-cn-3-78:before {content: \'（七十八）\'}\n' +
  '.my-frame-text li.list-cn-3-79:before {content: \'（七十九）\'}\n' +
  '.my-frame-text li.list-cn-3-80:before {content: \'（八十）\'}\n' +
  '.my-frame-text li.list-cn-3-81:before {content: \'（八十一）\'}\n' +
  '.my-frame-text li.list-cn-3-82:before {content: \'（八十二）\'}\n' +
  '.my-frame-text li.list-cn-3-83:before {content: \'（八十三）\'}\n' +
  '.my-frame-text li.list-cn-3-84:before {content: \'（八十四）\'}\n' +
  '.my-frame-text li.list-cn-3-85:before {content: \'（八十五）\'}\n' +
  '.my-frame-text li.list-cn-3-86:before {content: \'（八十六）\'}\n' +
  '.my-frame-text li.list-cn-3-87:before {content: \'（八十七）\'}\n' +
  '.my-frame-text li.list-cn-3-88:before {content: \'（八十八）\'}\n' +
  '.my-frame-text li.list-cn-3-89:before {content: \'（八十九）\'}\n' +
  '.my-frame-text li.list-cn-3-90:before {content: \'（九十）\'}\n' +
  '.my-frame-text li.list-cn-3-91:before {content: \'（九十一）\'}\n' +
  '.my-frame-text li.list-cn-3-92:before {content: \'（九十二）\'}\n' +
  '.my-frame-text li.list-cn-3-93:before {content: \'（九十三）\'}\n' +
  '.my-frame-text li.list-cn-3-94:before {content: \'（九十四）\'}\n' +
  '.my-frame-text li.list-cn-3-95:before {content: \'（九十五）\'}\n' +
  '.my-frame-text li.list-cn-3-96:before {content: \'（九十六）\'}\n' +
  '.my-frame-text li.list-cn-3-97:before {content: \'（九十七）\'}\n' +
  '.my-frame-text li.list-cn-3-98:before {content: \'（九十八）\'}\n' +
  '\n' +
  '\n' +
  '\n' +
  '\n' +
  '.my-frame-text li.list-num-1-1:before {content: \'1\'}\n' +
  '.my-frame-text li.list-num-1-2:before {content: \'2\'}\n' +
  '.my-frame-text li.list-num-1-3:before {content: \'3\'}\n' +
  '.my-frame-text li.list-num-1-4:before {content: \'4\'}\n' +
  '.my-frame-text li.list-num-1-5:before {content: \'5\'}\n' +
  '.my-frame-text li.list-num-1-6:before {content: \'6\'}\n' +
  '.my-frame-text li.list-num-1-7:before {content: \'7\'}\n' +
  '.my-frame-text li.list-num-1-8:before {content: \'8\'}\n' +
  '.my-frame-text li.list-num-1-9:before {content: \'9\'}\n' +
  '.my-frame-text li.list-num-1-10:before {content: \'10\'}\n' +
  '.my-frame-text li.list-num-1-11:before {content: \'11\'}\n' +
  '.my-frame-text li.list-num-1-12:before {content: \'12\'}\n' +
  '.my-frame-text li.list-num-1-13:before {content: \'13\'}\n' +
  '.my-frame-text li.list-num-1-14:before {content: \'14\'}\n' +
  '.my-frame-text li.list-num-1-15:before {content: \'15\'}\n' +
  '.my-frame-text li.list-num-1-16:before {content: \'16\'}\n' +
  '.my-frame-text li.list-num-1-17:before {content: \'17\'}\n' +
  '.my-frame-text li.list-num-1-18:before {content: \'18\'}\n' +
  '.my-frame-text li.list-num-1-19:before {content: \'19\'}\n' +
  '.my-frame-text li.list-num-1-20:before {content: \'20\'}\n' +
  '.my-frame-text li.list-num-1-21:before {content: \'21\'}\n' +
  '.my-frame-text li.list-num-1-22:before {content: \'22\'}\n' +
  '.my-frame-text li.list-num-1-23:before {content: \'23\'}\n' +
  '.my-frame-text li.list-num-1-24:before {content: \'24\'}\n' +
  '.my-frame-text li.list-num-1-25:before {content: \'25\'}\n' +
  '.my-frame-text li.list-num-1-26:before {content: \'26\'}\n' +
  '.my-frame-text li.list-num-1-27:before {content: \'27\'}\n' +
  '.my-frame-text li.list-num-1-28:before {content: \'28\'}\n' +
  '.my-frame-text li.list-num-1-29:before {content: \'29\'}\n' +
  '.my-frame-text li.list-num-1-30:before {content: \'30\'}\n' +
  '.my-frame-text li.list-num-1-31:before {content: \'31\'}\n' +
  '.my-frame-text li.list-num-1-32:before {content: \'32\'}\n' +
  '.my-frame-text li.list-num-1-33:before {content: \'33\'}\n' +
  '.my-frame-text li.list-num-1-34:before {content: \'34\'}\n' +
  '.my-frame-text li.list-num-1-35:before {content: \'35\'}\n' +
  '.my-frame-text li.list-num-1-36:before {content: \'36\'}\n' +
  '.my-frame-text li.list-num-1-37:before {content: \'37\'}\n' +
  '.my-frame-text li.list-num-1-38:before {content: \'38\'}\n' +
  '.my-frame-text li.list-num-1-39:before {content: \'39\'}\n' +
  '.my-frame-text li.list-num-1-40:before {content: \'40\'}\n' +
  '.my-frame-text li.list-num-1-41:before {content: \'41\'}\n' +
  '.my-frame-text li.list-num-1-42:before {content: \'42\'}\n' +
  '.my-frame-text li.list-num-1-43:before {content: \'43\'}\n' +
  '.my-frame-text li.list-num-1-44:before {content: \'44\'}\n' +
  '.my-frame-text li.list-num-1-45:before {content: \'45\'}\n' +
  '.my-frame-text li.list-num-1-46:before {content: \'46\'}\n' +
  '.my-frame-text li.list-num-1-47:before {content: \'47\'}\n' +
  '.my-frame-text li.list-num-1-48:before {content: \'48\'}\n' +
  '.my-frame-text li.list-num-1-49:before {content: \'49\'}\n' +
  '.my-frame-text li.list-num-1-50:before {content: \'50\'}\n' +
  '.my-frame-text li.list-num-1-51:before {content: \'51\'}\n' +
  '.my-frame-text li.list-num-1-52:before {content: \'52\'}\n' +
  '.my-frame-text li.list-num-1-53:before {content: \'53\'}\n' +
  '.my-frame-text li.list-num-1-54:before {content: \'54\'}\n' +
  '.my-frame-text li.list-num-1-55:before {content: \'55\'}\n' +
  '.my-frame-text li.list-num-1-56:before {content: \'56\'}\n' +
  '.my-frame-text li.list-num-1-57:before {content: \'57\'}\n' +
  '.my-frame-text li.list-num-1-58:before {content: \'58\'}\n' +
  '.my-frame-text li.list-num-1-59:before {content: \'59\'}\n' +
  '.my-frame-text li.list-num-1-60:before {content: \'60\'}\n' +
  '.my-frame-text li.list-num-1-61:before {content: \'61\'}\n' +
  '.my-frame-text li.list-num-1-62:before {content: \'62\'}\n' +
  '.my-frame-text li.list-num-1-63:before {content: \'63\'}\n' +
  '.my-frame-text li.list-num-1-64:before {content: \'64\'}\n' +
  '.my-frame-text li.list-num-1-65:before {content: \'65\'}\n' +
  '.my-frame-text li.list-num-1-66:before {content: \'66\'}\n' +
  '.my-frame-text li.list-num-1-67:before {content: \'67\'}\n' +
  '.my-frame-text li.list-num-1-68:before {content: \'68\'}\n' +
  '.my-frame-text li.list-num-1-69:before {content: \'69\'}\n' +
  '.my-frame-text li.list-num-1-70:before {content: \'70\'}\n' +
  '.my-frame-text li.list-num-1-71:before {content: \'71\'}\n' +
  '.my-frame-text li.list-num-1-72:before {content: \'72\'}\n' +
  '.my-frame-text li.list-num-1-73:before {content: \'73\'}\n' +
  '.my-frame-text li.list-num-1-74:before {content: \'74\'}\n' +
  '.my-frame-text li.list-num-1-75:before {content: \'75\'}\n' +
  '.my-frame-text li.list-num-1-76:before {content: \'76\'}\n' +
  '.my-frame-text li.list-num-1-77:before {content: \'77\'}\n' +
  '.my-frame-text li.list-num-1-78:before {content: \'78\'}\n' +
  '.my-frame-text li.list-num-1-79:before {content: \'79\'}\n' +
  '.my-frame-text li.list-num-1-80:before {content: \'80\'}\n' +
  '.my-frame-text li.list-num-1-81:before {content: \'81\'}\n' +
  '.my-frame-text li.list-num-1-82:before {content: \'82\'}\n' +
  '.my-frame-text li.list-num-1-83:before {content: \'83\'}\n' +
  '.my-frame-text li.list-num-1-84:before {content: \'84\'}\n' +
  '.my-frame-text li.list-num-1-85:before {content: \'85\'}\n' +
  '.my-frame-text li.list-num-1-86:before {content: \'86\'}\n' +
  '.my-frame-text li.list-num-1-87:before {content: \'87\'}\n' +
  '.my-frame-text li.list-num-1-88:before {content: \'88\'}\n' +
  '.my-frame-text li.list-num-1-89:before {content: \'89\'}\n' +
  '.my-frame-text li.list-num-1-90:before {content: \'90\'}\n' +
  '.my-frame-text li.list-num-1-91:before {content: \'91\'}\n' +
  '.my-frame-text li.list-num-1-92:before {content: \'92\'}\n' +
  '.my-frame-text li.list-num-1-93:before {content: \'93\'}\n' +
  '.my-frame-text li.list-num-1-94:before {content: \'94\'}\n' +
  '.my-frame-text li.list-num-1-95:before {content: \'95\'}\n' +
  '.my-frame-text li.list-num-1-96:before {content: \'96\'}\n' +
  '.my-frame-text li.list-num-1-97:before {content: \'97\'}\n' +
  '.my-frame-text li.list-num-1-98:before {content: \'98\'}\n' +
  '\n' +
  '\n' +
  '\n' +
  '.my-frame-text li.list-num-2-1:before {content: \'1）\'}\n' +
  '.my-frame-text li.list-num-2-2:before {content: \'2）\'}\n' +
  '.my-frame-text li.list-num-2-3:before {content: \'3）\'}\n' +
  '.my-frame-text li.list-num-2-4:before {content: \'4）\'}\n' +
  '.my-frame-text li.list-num-2-5:before {content: \'5）\'}\n' +
  '.my-frame-text li.list-num-2-6:before {content: \'6）\'}\n' +
  '.my-frame-text li.list-num-2-7:before {content: \'7）\'}\n' +
  '.my-frame-text li.list-num-2-8:before {content: \'8）\'}\n' +
  '.my-frame-text li.list-num-2-9:before {content: \'9）\'}\n' +
  '.my-frame-text li.list-num-2-10:before {content: \'10）\'}\n' +
  '.my-frame-text li.list-num-2-11:before {content: \'11）\'}\n' +
  '.my-frame-text li.list-num-2-12:before {content: \'12）\'}\n' +
  '.my-frame-text li.list-num-2-13:before {content: \'13）\'}\n' +
  '.my-frame-text li.list-num-2-14:before {content: \'14）\'}\n' +
  '.my-frame-text li.list-num-2-15:before {content: \'15）\'}\n' +
  '.my-frame-text li.list-num-2-16:before {content: \'16）\'}\n' +
  '.my-frame-text li.list-num-2-17:before {content: \'17）\'}\n' +
  '.my-frame-text li.list-num-2-18:before {content: \'18）\'}\n' +
  '.my-frame-text li.list-num-2-19:before {content: \'19）\'}\n' +
  '.my-frame-text li.list-num-2-20:before {content: \'20）\'}\n' +
  '.my-frame-text li.list-num-2-21:before {content: \'21）\'}\n' +
  '.my-frame-text li.list-num-2-22:before {content: \'22）\'}\n' +
  '.my-frame-text li.list-num-2-23:before {content: \'23）\'}\n' +
  '.my-frame-text li.list-num-2-24:before {content: \'24）\'}\n' +
  '.my-frame-text li.list-num-2-25:before {content: \'25）\'}\n' +
  '.my-frame-text li.list-num-2-26:before {content: \'26）\'}\n' +
  '.my-frame-text li.list-num-2-27:before {content: \'27）\'}\n' +
  '.my-frame-text li.list-num-2-28:before {content: \'28）\'}\n' +
  '.my-frame-text li.list-num-2-29:before {content: \'29）\'}\n' +
  '.my-frame-text li.list-num-2-30:before {content: \'30）\'}\n' +
  '.my-frame-text li.list-num-2-31:before {content: \'31）\'}\n' +
  '.my-frame-text li.list-num-2-32:before {content: \'32）\'}\n' +
  '.my-frame-text li.list-num-2-33:before {content: \'33）\'}\n' +
  '.my-frame-text li.list-num-2-34:before {content: \'34）\'}\n' +
  '.my-frame-text li.list-num-2-35:before {content: \'35）\'}\n' +
  '.my-frame-text li.list-num-2-36:before {content: \'36）\'}\n' +
  '.my-frame-text li.list-num-2-37:before {content: \'37）\'}\n' +
  '.my-frame-text li.list-num-2-38:before {content: \'38）\'}\n' +
  '.my-frame-text li.list-num-2-39:before {content: \'39）\'}\n' +
  '.my-frame-text li.list-num-2-40:before {content: \'40）\'}\n' +
  '.my-frame-text li.list-num-2-41:before {content: \'41）\'}\n' +
  '.my-frame-text li.list-num-2-42:before {content: \'42）\'}\n' +
  '.my-frame-text li.list-num-2-43:before {content: \'43）\'}\n' +
  '.my-frame-text li.list-num-2-44:before {content: \'44）\'}\n' +
  '.my-frame-text li.list-num-2-45:before {content: \'45）\'}\n' +
  '.my-frame-text li.list-num-2-46:before {content: \'46）\'}\n' +
  '.my-frame-text li.list-num-2-47:before {content: \'47）\'}\n' +
  '.my-frame-text li.list-num-2-48:before {content: \'48）\'}\n' +
  '.my-frame-text li.list-num-2-49:before {content: \'49）\'}\n' +
  '.my-frame-text li.list-num-2-50:before {content: \'50）\'}\n' +
  '.my-frame-text li.list-num-2-51:before {content: \'51）\'}\n' +
  '.my-frame-text li.list-num-2-52:before {content: \'52）\'}\n' +
  '.my-frame-text li.list-num-2-53:before {content: \'53）\'}\n' +
  '.my-frame-text li.list-num-2-54:before {content: \'54）\'}\n' +
  '.my-frame-text li.list-num-2-55:before {content: \'55）\'}\n' +
  '.my-frame-text li.list-num-2-56:before {content: \'56）\'}\n' +
  '.my-frame-text li.list-num-2-57:before {content: \'57）\'}\n' +
  '.my-frame-text li.list-num-2-58:before {content: \'58）\'}\n' +
  '.my-frame-text li.list-num-2-59:before {content: \'59）\'}\n' +
  '.my-frame-text li.list-num-2-60:before {content: \'60）\'}\n' +
  '.my-frame-text li.list-num-2-61:before {content: \'61）\'}\n' +
  '.my-frame-text li.list-num-2-62:before {content: \'62）\'}\n' +
  '.my-frame-text li.list-num-2-63:before {content: \'63）\'}\n' +
  '.my-frame-text li.list-num-2-64:before {content: \'64）\'}\n' +
  '.my-frame-text li.list-num-2-65:before {content: \'65）\'}\n' +
  '.my-frame-text li.list-num-2-66:before {content: \'66）\'}\n' +
  '.my-frame-text li.list-num-2-67:before {content: \'67）\'}\n' +
  '.my-frame-text li.list-num-2-68:before {content: \'68）\'}\n' +
  '.my-frame-text li.list-num-2-69:before {content: \'69）\'}\n' +
  '.my-frame-text li.list-num-2-70:before {content: \'70）\'}\n' +
  '.my-frame-text li.list-num-2-71:before {content: \'71）\'}\n' +
  '.my-frame-text li.list-num-2-72:before {content: \'72）\'}\n' +
  '.my-frame-text li.list-num-2-73:before {content: \'73）\'}\n' +
  '.my-frame-text li.list-num-2-74:before {content: \'74）\'}\n' +
  '.my-frame-text li.list-num-2-75:before {content: \'75）\'}\n' +
  '.my-frame-text li.list-num-2-76:before {content: \'76）\'}\n' +
  '.my-frame-text li.list-num-2-77:before {content: \'77）\'}\n' +
  '.my-frame-text li.list-num-2-78:before {content: \'78）\'}\n' +
  '.my-frame-text li.list-num-2-79:before {content: \'79）\'}\n' +
  '.my-frame-text li.list-num-2-80:before {content: \'80）\'}\n' +
  '.my-frame-text li.list-num-2-81:before {content: \'81）\'}\n' +
  '.my-frame-text li.list-num-2-82:before {content: \'82）\'}\n' +
  '.my-frame-text li.list-num-2-83:before {content: \'83）\'}\n' +
  '.my-frame-text li.list-num-2-84:before {content: \'84）\'}\n' +
  '.my-frame-text li.list-num-2-85:before {content: \'85）\'}\n' +
  '.my-frame-text li.list-num-2-86:before {content: \'86）\'}\n' +
  '.my-frame-text li.list-num-2-87:before {content: \'87）\'}\n' +
  '.my-frame-text li.list-num-2-88:before {content: \'88）\'}\n' +
  '.my-frame-text li.list-num-2-89:before {content: \'89）\'}\n' +
  '.my-frame-text li.list-num-2-90:before {content: \'90）\'}\n' +
  '.my-frame-text li.list-num-2-91:before {content: \'91）\'}\n' +
  '.my-frame-text li.list-num-2-92:before {content: \'92）\'}\n' +
  '.my-frame-text li.list-num-2-93:before {content: \'93）\'}\n' +
  '.my-frame-text li.list-num-2-94:before {content: \'94）\'}\n' +
  '.my-frame-text li.list-num-2-95:before {content: \'95）\'}\n' +
  '.my-frame-text li.list-num-2-96:before {content: \'96）\'}\n' +
  '.my-frame-text li.list-num-2-97:before {content: \'97）\'}\n' +
  '.my-frame-text li.list-num-2-98:before {content: \'98）\'}\n' +
  '\n' +
  '\n' +
  '\n' +
  '\n' +
  '.my-frame-text li.list-num-3-1:before {content: \'（1）\'}\n' +
  '.my-frame-text li.list-num-3-2:before {content: \'（2）\'}\n' +
  '.my-frame-text li.list-num-3-3:before {content: \'（3）\'}\n' +
  '.my-frame-text li.list-num-3-4:before {content: \'（4）\'}\n' +
  '.my-frame-text li.list-num-3-5:before {content: \'（5）\'}\n' +
  '.my-frame-text li.list-num-3-6:before {content: \'（6）\'}\n' +
  '.my-frame-text li.list-num-3-7:before {content: \'（7）\'}\n' +
  '.my-frame-text li.list-num-3-8:before {content: \'（8）\'}\n' +
  '.my-frame-text li.list-num-3-9:before {content: \'（9）\'}\n' +
  '.my-frame-text li.list-num-3-10:before {content: \'（10）\'}\n' +
  '.my-frame-text li.list-num-3-11:before {content: \'（11）\'}\n' +
  '.my-frame-text li.list-num-3-12:before {content: \'（12）\'}\n' +
  '.my-frame-text li.list-num-3-13:before {content: \'（13）\'}\n' +
  '.my-frame-text li.list-num-3-14:before {content: \'（14）\'}\n' +
  '.my-frame-text li.list-num-3-15:before {content: \'（15）\'}\n' +
  '.my-frame-text li.list-num-3-16:before {content: \'（16）\'}\n' +
  '.my-frame-text li.list-num-3-17:before {content: \'（17）\'}\n' +
  '.my-frame-text li.list-num-3-18:before {content: \'（18）\'}\n' +
  '.my-frame-text li.list-num-3-19:before {content: \'（19）\'}\n' +
  '.my-frame-text li.list-num-3-20:before {content: \'（20）\'}\n' +
  '.my-frame-text li.list-num-3-21:before {content: \'（21）\'}\n' +
  '.my-frame-text li.list-num-3-22:before {content: \'（22）\'}\n' +
  '.my-frame-text li.list-num-3-23:before {content: \'（23）\'}\n' +
  '.my-frame-text li.list-num-3-24:before {content: \'（24）\'}\n' +
  '.my-frame-text li.list-num-3-25:before {content: \'（25）\'}\n' +
  '.my-frame-text li.list-num-3-26:before {content: \'（26）\'}\n' +
  '.my-frame-text li.list-num-3-27:before {content: \'（27）\'}\n' +
  '.my-frame-text li.list-num-3-28:before {content: \'（28）\'}\n' +
  '.my-frame-text li.list-num-3-29:before {content: \'（29）\'}\n' +
  '.my-frame-text li.list-num-3-30:before {content: \'（30）\'}\n' +
  '.my-frame-text li.list-num-3-31:before {content: \'（31）\'}\n' +
  '.my-frame-text li.list-num-3-32:before {content: \'（32）\'}\n' +
  '.my-frame-text li.list-num-3-33:before {content: \'（33）\'}\n' +
  '.my-frame-text li.list-num-3-34:before {content: \'（34）\'}\n' +
  '.my-frame-text li.list-num-3-35:before {content: \'（35）\'}\n' +
  '.my-frame-text li.list-num-3-36:before {content: \'（36）\'}\n' +
  '.my-frame-text li.list-num-3-37:before {content: \'（37）\'}\n' +
  '.my-frame-text li.list-num-3-38:before {content: \'（38）\'}\n' +
  '.my-frame-text li.list-num-3-39:before {content: \'（39）\'}\n' +
  '.my-frame-text li.list-num-3-40:before {content: \'（40）\'}\n' +
  '.my-frame-text li.list-num-3-41:before {content: \'（41）\'}\n' +
  '.my-frame-text li.list-num-3-42:before {content: \'（42）\'}\n' +
  '.my-frame-text li.list-num-3-43:before {content: \'（43）\'}\n' +
  '.my-frame-text li.list-num-3-44:before {content: \'（44）\'}\n' +
  '.my-frame-text li.list-num-3-45:before {content: \'（45）\'}\n' +
  '.my-frame-text li.list-num-3-46:before {content: \'（46）\'}\n' +
  '.my-frame-text li.list-num-3-47:before {content: \'（47）\'}\n' +
  '.my-frame-text li.list-num-3-48:before {content: \'（48）\'}\n' +
  '.my-frame-text li.list-num-3-49:before {content: \'（49）\'}\n' +
  '.my-frame-text li.list-num-3-50:before {content: \'（50）\'}\n' +
  '.my-frame-text li.list-num-3-51:before {content: \'（51）\'}\n' +
  '.my-frame-text li.list-num-3-52:before {content: \'（52）\'}\n' +
  '.my-frame-text li.list-num-3-53:before {content: \'（53）\'}\n' +
  '.my-frame-text li.list-num-3-54:before {content: \'（54）\'}\n' +
  '.my-frame-text li.list-num-3-55:before {content: \'（55）\'}\n' +
  '.my-frame-text li.list-num-3-56:before {content: \'（56）\'}\n' +
  '.my-frame-text li.list-num-3-57:before {content: \'（57）\'}\n' +
  '.my-frame-text li.list-num-3-58:before {content: \'（58）\'}\n' +
  '.my-frame-text li.list-num-3-59:before {content: \'（59）\'}\n' +
  '.my-frame-text li.list-num-3-60:before {content: \'（60）\'}\n' +
  '.my-frame-text li.list-num-3-61:before {content: \'（61）\'}\n' +
  '.my-frame-text li.list-num-3-62:before {content: \'（62）\'}\n' +
  '.my-frame-text li.list-num-3-63:before {content: \'（63）\'}\n' +
  '.my-frame-text li.list-num-3-64:before {content: \'（64）\'}\n' +
  '.my-frame-text li.list-num-3-65:before {content: \'（65）\'}\n' +
  '.my-frame-text li.list-num-3-66:before {content: \'（66）\'}\n' +
  '.my-frame-text li.list-num-3-67:before {content: \'（67）\'}\n' +
  '.my-frame-text li.list-num-3-68:before {content: \'（68）\'}\n' +
  '.my-frame-text li.list-num-3-69:before {content: \'（69）\'}\n' +
  '.my-frame-text li.list-num-3-70:before {content: \'（70）\'}\n' +
  '.my-frame-text li.list-num-3-71:before {content: \'（71）\'}\n' +
  '.my-frame-text li.list-num-3-72:before {content: \'（72）\'}\n' +
  '.my-frame-text li.list-num-3-73:before {content: \'（73）\'}\n' +
  '.my-frame-text li.list-num-3-74:before {content: \'（74）\'}\n' +
  '.my-frame-text li.list-num-3-75:before {content: \'（75）\'}\n' +
  '.my-frame-text li.list-num-3-76:before {content: \'（76）\'}\n' +
  '.my-frame-text li.list-num-3-77:before {content: \'（77）\'}\n' +
  '.my-frame-text li.list-num-3-78:before {content: \'（78）\'}\n' +
  '.my-frame-text li.list-num-3-79:before {content: \'（79）\'}\n' +
  '.my-frame-text li.list-num-3-80:before {content: \'（80）\'}\n' +
  '.my-frame-text li.list-num-3-81:before {content: \'（81）\'}\n' +
  '.my-frame-text li.list-num-3-82:before {content: \'（82）\'}\n' +
  '.my-frame-text li.list-num-3-83:before {content: \'（83）\'}\n' +
  '.my-frame-text li.list-num-3-84:before {content: \'（84）\'}\n' +
  '.my-frame-text li.list-num-3-85:before {content: \'（85）\'}\n' +
  '.my-frame-text li.list-num-3-86:before {content: \'（86）\'}\n' +
  '.my-frame-text li.list-num-3-87:before {content: \'（87）\'}\n' +
  '.my-frame-text li.list-num-3-88:before {content: \'（88）\'}\n' +
  '.my-frame-text li.list-num-3-89:before {content: \'（89）\'}\n' +
  '.my-frame-text li.list-num-3-90:before {content: \'（90）\'}\n' +
  '.my-frame-text li.list-num-3-91:before {content: \'（91）\'}\n' +
  '.my-frame-text li.list-num-3-92:before {content: \'（92）\'}\n' +
  '.my-frame-text li.list-num-3-93:before {content: \'（93）\'}\n' +
  '.my-frame-text li.list-num-3-94:before {content: \'（94）\'}\n' +
  '.my-frame-text li.list-num-3-95:before {content: \'（95）\'}\n' +
  '.my-frame-text li.list-num-3-96:before {content: \'（96）\'}\n' +
  '.my-frame-text li.list-num-3-97:before {content: \'（97）\'}\n' +
  '.my-frame-text li.list-num-3-98:before {content: \'（98）\'}\n' +
  '.my-frame-text li[class*="list-cn-"],#my-frame-text li[class*="list-num-"]{position: relative;}' +
  '.my-frame-text li[class*="list-cn-"]:before,#my-frame-text li[class*="list-num-"]:before{content:\'一\';position:absolute;left:0;top:0;}' +
  '.my-frame-text table {max-width:100%;margin-bottom:10px;border-collapse:collapse;}' +
  '.my-frame-text table tr td, #my-frame-text table tr th {padding:5px 10px;border:1px solid transparent;}' +
  '.my-frame-text{width:100%;max-width:100vw;overflow-x:hidden;}.ql-container {\n' +
  '  box-sizing: border-box;\n' +
  '  font-family: Helvetica, Arial, sans-serif;\n' +
  '  font-size: 13px;\n' +
  '  height: 100%;\n' +
  '  margin: 0px;\n' +
  '  position: relative;\n' +
  '}\n' +
  '.ql-container.ql-disabled .ql-tooltip {\n' +
  '  visibility: hidden;\n' +
  '}\n' +
  '.ql-container.ql-disabled .ql-editor ul[data-checked] > li::before {\n' +
  '  pointer-events: none;\n' +
  '}\n' +
  '.ql-clipboard {\n' +
  '  left: -100000px;\n' +
  '  height: 1px;\n' +
  '  overflow-y: hidden;\n' +
  '  position: absolute;\n' +
  '  top: 50%;\n' +
  '}\n' +
  '.ql-clipboard p {\n' +
  '  margin: 0;\n' +
  '  padding: 0;\n' +
  '}\n' +
  '.ql-editor {\n' +
  '  box-sizing: border-box;\n' +
  '  line-height: 1.42;\n' +
  '  height: 100%;\n' +
  '  outline: none;\n' +
  '  overflow-y: auto;\n' +
  '  tab-size: 4;\n' +
  '  -moz-tab-size: 4;\n' +
  '  text-align: left;\n' +
  '  white-space: pre-wrap;\n' +
  '  word-wrap: break-word;\n' +
  '}\n' +
  '.ql-editor > * {\n' +
  '  cursor: text;\n' +
  '}\n' +
  '.ql-editor p,\n' +
  '.ql-editor ol,\n' +
  '.ql-editor ul,\n' +
  '.ql-editor pre,\n' +
  '.ql-editor blockquote,\n' +
  '.ql-editor h1,\n' +
  '.ql-editor h2,\n' +
  '.ql-editor h3,\n' +
  '.ql-editor h4,\n' +
  '.ql-editor h5,\n' +
  '.ql-editor h6 {\n' +
  '  margin: 0;\n' +
  '  padding: 0;\n' +
  '  counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n' +
  '}\n' +
  '.ql-editor ol,\n' +
  '.ql-editor ul {\n' +
  '  padding-left: 1.5em;\n' +
  '}\n' +
  '.ql-editor ol > li,\n' +
  '.ql-editor ul > li {\n' +
  '  list-style-type: none;\n' +
  '}\n' +
  '.ql-editor ul > li::before {\n' +
  '  content: \'\\2022\';\n' +
  '}\n' +
  '.ql-editor ul[data-checked=true],\n' +
  '.ql-editor ul[data-checked=false] {\n' +
  '  pointer-events: none;\n' +
  '}\n' +
  '.ql-editor ul[data-checked=true] > li *,\n' +
  '.ql-editor ul[data-checked=false] > li * {\n' +
  '  pointer-events: all;\n' +
  '}\n' +
  '.ql-editor ul[data-checked=true] > li::before,\n' +
  '.ql-editor ul[data-checked=false] > li::before {\n' +
  '  color: #777;\n' +
  '  cursor: pointer;\n' +
  '  pointer-events: all;\n' +
  '}\n' +
  '.ql-editor ul[data-checked=true] > li::before {\n' +
  '  content: \'\\2611\';\n' +
  '}\n' +
  '.ql-editor ul[data-checked=false] > li::before {\n' +
  '  content: \'\\2610\';\n' +
  '}\n' +
  '.ql-editor li::before {\n' +
  '  display: inline-block;\n' +
  '  white-space: nowrap;\n' +
  '  width: 1.2em;\n' +
  '}\n' +
  '.ql-editor li:not(.ql-direction-rtl)::before {\n' +
  '  margin-left: -1.5em;\n' +
  '  margin-right: 0.3em;\n' +
  '  text-align: right;\n' +
  '}\n' +
  '.ql-editor li.ql-direction-rtl::before {\n' +
  '  margin-left: 0.3em;\n' +
  '  margin-right: -1.5em;\n' +
  '}\n' +
  '.ql-editor ol li:not(.ql-direction-rtl),\n' +
  '.ql-editor ul li:not(.ql-direction-rtl) {\n' +
  '  padding-left: 1.5em;\n' +
  '}\n' +
  '.ql-editor ol li.ql-direction-rtl,\n' +
  '.ql-editor ul li.ql-direction-rtl {\n' +
  '  padding-right: 1.5em;\n' +
  '}\n' +
  '.ql-editor ol li {\n' +
  '  counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n' +
  '  counter-increment: list-0;\n' +
  '}\n' +
  '.ql-editor ol li:before {\n' +
  '  content: counter(list-0, decimal) \'. \';\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-1 {\n' +
  '  counter-increment: list-1;\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-1:before {\n' +
  '  content: counter(list-1, lower-alpha) \'. \';\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-1 {\n' +
  '  counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-2 {\n' +
  '  counter-increment: list-2;\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-2:before {\n' +
  '  content: counter(list-2, lower-roman) \'. \';\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-2 {\n' +
  '  counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-3 {\n' +
  '  counter-increment: list-3;\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-3:before {\n' +
  '  content: counter(list-3, decimal) \'. \';\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-3 {\n' +
  '  counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-4 {\n' +
  '  counter-increment: list-4;\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-4:before {\n' +
  '  content: counter(list-4, lower-alpha) \'. \';\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-4 {\n' +
  '  counter-reset: list-5 list-6 list-7 list-8 list-9;\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-5 {\n' +
  '  counter-increment: list-5;\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-5:before {\n' +
  '  content: counter(list-5, lower-roman) \'. \';\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-5 {\n' +
  '  counter-reset: list-6 list-7 list-8 list-9;\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-6 {\n' +
  '  counter-increment: list-6;\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-6:before {\n' +
  '  content: counter(list-6, decimal) \'. \';\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-6 {\n' +
  '  counter-reset: list-7 list-8 list-9;\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-7 {\n' +
  '  counter-increment: list-7;\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-7:before {\n' +
  '  content: counter(list-7, lower-alpha) \'. \';\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-7 {\n' +
  '  counter-reset: list-8 list-9;\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-8 {\n' +
  '  counter-increment: list-8;\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-8:before {\n' +
  '  content: counter(list-8, lower-roman) \'. \';\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-8 {\n' +
  '  counter-reset: list-9;\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-9 {\n' +
  '  counter-increment: list-9;\n' +
  '}\n' +
  '.ql-editor ol li.ql-indent-9:before {\n' +
  '  content: counter(list-9, decimal) \'. \';\n' +
  '}\n' +
  '.ql-editor .ql-indent-1:not(.ql-direction-rtl) {\n' +
  '  padding-left: 3em;\n' +
  '}\n' +
  '.ql-editor li.ql-indent-1:not(.ql-direction-rtl) {\n' +
  '  padding-left: 4.5em;\n' +
  '}\n' +
  '.ql-editor .ql-indent-1.ql-direction-rtl.ql-align-right {\n' +
  '  padding-right: 3em;\n' +
  '}\n' +
  '.ql-editor li.ql-indent-1.ql-direction-rtl.ql-align-right {\n' +
  '  padding-right: 4.5em;\n' +
  '}\n' +
  '.ql-editor .ql-indent-2:not(.ql-direction-rtl) {\n' +
  '  padding-left: 6em;\n' +
  '}\n' +
  '.ql-editor li.ql-indent-2:not(.ql-direction-rtl) {\n' +
  '  padding-left: 7.5em;\n' +
  '}\n' +
  '.ql-editor .ql-indent-2.ql-direction-rtl.ql-align-right {\n' +
  '  padding-right: 6em;\n' +
  '}\n' +
  '.ql-editor li.ql-indent-2.ql-direction-rtl.ql-align-right {\n' +
  '  padding-right: 7.5em;\n' +
  '}\n' +
  '.ql-editor .ql-indent-3:not(.ql-direction-rtl) {\n' +
  '  padding-left: 9em;\n' +
  '}\n' +
  '.ql-editor li.ql-indent-3:not(.ql-direction-rtl) {\n' +
  '  padding-left: 10.5em;\n' +
  '}\n' +
  '.ql-editor .ql-indent-3.ql-direction-rtl.ql-align-right {\n' +
  '  padding-right: 9em;\n' +
  '}\n' +
  '.ql-editor li.ql-indent-3.ql-direction-rtl.ql-align-right {\n' +
  '  padding-right: 10.5em;\n' +
  '}\n' +
  '.ql-editor .ql-indent-4:not(.ql-direction-rtl) {\n' +
  '  padding-left: 12em;\n' +
  '}\n' +
  '.ql-editor li.ql-indent-4:not(.ql-direction-rtl) {\n' +
  '  padding-left: 13.5em;\n' +
  '}\n' +
  '.ql-editor .ql-indent-4.ql-direction-rtl.ql-align-right {\n' +
  '  padding-right: 12em;\n' +
  '}\n' +
  '.ql-editor li.ql-indent-4.ql-direction-rtl.ql-align-right {\n' +
  '  padding-right: 13.5em;\n' +
  '}\n' +
  '.ql-editor .ql-indent-5:not(.ql-direction-rtl) {\n' +
  '  padding-left: 15em;\n' +
  '}\n' +
  '.ql-editor li.ql-indent-5:not(.ql-direction-rtl) {\n' +
  '  padding-left: 16.5em;\n' +
  '}\n' +
  '.ql-editor .ql-indent-5.ql-direction-rtl.ql-align-right {\n' +
  '  padding-right: 15em;\n' +
  '}\n' +
  '.ql-editor li.ql-indent-5.ql-direction-rtl.ql-align-right {\n' +
  '  padding-right: 16.5em;\n' +
  '}\n' +
  '.ql-editor .ql-indent-6:not(.ql-direction-rtl) {\n' +
  '  padding-left: 18em;\n' +
  '}\n' +
  '.ql-editor li.ql-indent-6:not(.ql-direction-rtl) {\n' +
  '  padding-left: 19.5em;\n' +
  '}\n' +
  '.ql-editor .ql-indent-6.ql-direction-rtl.ql-align-right {\n' +
  '  padding-right: 18em;\n' +
  '}\n' +
  '.ql-editor li.ql-indent-6.ql-direction-rtl.ql-align-right {\n' +
  '  padding-right: 19.5em;\n' +
  '}\n' +
  '.ql-editor .ql-indent-7:not(.ql-direction-rtl) {\n' +
  '  padding-left: 21em;\n' +
  '}\n' +
  '.ql-editor li.ql-indent-7:not(.ql-direction-rtl) {\n' +
  '  padding-left: 22.5em;\n' +
  '}\n' +
  '.ql-editor .ql-indent-7.ql-direction-rtl.ql-align-right {\n' +
  '  padding-right: 21em;\n' +
  '}\n' +
  '.ql-editor li.ql-indent-7.ql-direction-rtl.ql-align-right {\n' +
  '  padding-right: 22.5em;\n' +
  '}\n' +
  '.ql-editor .ql-indent-8:not(.ql-direction-rtl) {\n' +
  '  padding-left: 24em;\n' +
  '}\n' +
  '.ql-editor li.ql-indent-8:not(.ql-direction-rtl) {\n' +
  '  padding-left: 25.5em;\n' +
  '}\n' +
  '.ql-editor .ql-indent-8.ql-direction-rtl.ql-align-right {\n' +
  '  padding-right: 24em;\n' +
  '}\n' +
  '.ql-editor li.ql-indent-8.ql-direction-rtl.ql-align-right {\n' +
  '  padding-right: 25.5em;\n' +
  '}\n' +
  '.ql-editor .ql-indent-9:not(.ql-direction-rtl) {\n' +
  '  padding-left: 27em;\n' +
  '}\n' +
  '.ql-editor li.ql-indent-9:not(.ql-direction-rtl) {\n' +
  '  padding-left: 28.5em;\n' +
  '}\n' +
  '.ql-editor .ql-indent-9.ql-direction-rtl.ql-align-right {\n' +
  '  padding-right: 27em;\n' +
  '}\n' +
  '.ql-editor li.ql-indent-9.ql-direction-rtl.ql-align-right {\n' +
  '  padding-right: 28.5em;\n' +
  '}\n' +
  '.ql-editor .ql-video {\n' +
  '  display: block;\n' +
  '  max-width: 100%;\n' +
  '}\n' +
  '.ql-editor .ql-video.ql-align-center {\n' +
  '  margin: 0 auto;\n' +
  '}\n' +
  '.ql-editor .ql-video.ql-align-right {\n' +
  '  margin: 0 0 0 auto;\n' +
  '}\n' +
  '.ql-editor .ql-bg-black {\n' +
  '  background-color: #000;\n' +
  '}\n' +
  '.ql-editor .ql-bg-red {\n' +
  '  background-color: #e60000;\n' +
  '}\n' +
  '.ql-editor .ql-bg-orange {\n' +
  '  background-color: #f90;\n' +
  '}\n' +
  '.ql-editor .ql-bg-yellow {\n' +
  '  background-color: #ff0;\n' +
  '}\n' +
  '.ql-editor .ql-bg-green {\n' +
  '  background-color: #008a00;\n' +
  '}\n' +
  '.ql-editor .ql-bg-blue {\n' +
  '  background-color: #06c;\n' +
  '}\n' +
  '.ql-editor .ql-bg-purple {\n' +
  '  background-color: #93f;\n' +
  '}\n' +
  '.ql-editor .ql-color-white {\n' +
  '  color: #fff;\n' +
  '}\n' +
  '.ql-editor .ql-color-red {\n' +
  '  color: #e60000;\n' +
  '}\n' +
  '.ql-editor .ql-color-orange {\n' +
  '  color: #f90;\n' +
  '}\n' +
  '.ql-editor .ql-color-yellow {\n' +
  '  color: #ff0;\n' +
  '}\n' +
  '.ql-editor .ql-color-green {\n' +
  '  color: #008a00;\n' +
  '}\n' +
  '.ql-editor .ql-color-blue {\n' +
  '  color: #06c;\n' +
  '}\n' +
  '.ql-editor .ql-color-purple {\n' +
  '  color: #93f;\n' +
  '}\n' +
  '.ql-editor .ql-font-serif {\n' +
  '  font-family: Georgia, Times New Roman, serif;\n' +
  '}\n' +
  '.ql-editor .ql-font-monospace {\n' +
  '  font-family: Monaco, Courier New, monospace;\n' +
  '}\n' +
  '.ql-editor .ql-size-small {\n' +
  '  font-size: 0.75em;\n' +
  '}\n' +
  '.ql-editor .ql-size-large {\n' +
  '  font-size: 1.5em;\n' +
  '}\n' +
  '.ql-editor .ql-size-huge {\n' +
  '  font-size: 2.5em;\n' +
  '}\n' +
  '.ql-editor .ql-direction-rtl {\n' +
  '  direction: rtl;\n' +
  '  text-align: inherit;\n' +
  '}\n' +
  '.ql-editor .ql-align-center {\n' +
  '  text-align: center;\n' +
  '}\n' +
  '.ql-editor .ql-align-justify {\n' +
  '  text-align: justify;\n' +
  '}\n' +
  '.ql-editor .ql-align-right {\n' +
  '  text-align: right;\n' +
  '}\n' +
  '.ql-editor.ql-blank::before {\n' +
  '  color: rgba(0,0,0,0.6);\n' +
  '  content: attr(data-placeholder);\n' +
  '  font-style: italic;\n' +
  '  left: 15px;\n' +
  '  pointer-events: none;\n' +
  '  position: absolute;\n' +
  '  right: 15px;\n' +
  '}\n' +
  '.ql-editor.ql-toolbar:after,\n' +
  '.ql-editor .ql-toolbar:after {\n' +
  '  clear: both;\n' +
  '  content: \'\';\n' +
  '  display: table;\n' +
  '}\n' +
  '.ql-editor.ql-toolbar button,\n' +
  '.ql-editor .ql-toolbar button {\n' +
  '  background: none;\n' +
  '  border: none;\n' +
  '  cursor: pointer;\n' +
  '  display: inline-block;\n' +
  '  float: left;\n' +
  '  height: 24px;\n' +
  '  padding: 3px 5px;\n' +
  '  width: 28px;\n' +
  '}\n' +
  '.ql-editor.ql-toolbar button svg,\n' +
  '.ql-editor .ql-toolbar button svg {\n' +
  '  float: left;\n' +
  '  height: 100%;\n' +
  '}\n' +
  '.ql-editor.ql-toolbar button:active:hover,\n' +
  '.ql-editor .ql-toolbar button:active:hover {\n' +
  '  outline: none;\n' +
  '}\n' +
  '.ql-editor.ql-toolbar input.ql-image[type=file],\n' +
  '.ql-editor .ql-toolbar input.ql-image[type=file] {\n' +
  '  display: none;\n' +
  '}\n' +
  '.ql-editor.ql-toolbar button:hover,\n' +
  '.ql-editor .ql-toolbar button:hover,\n' +
  '.ql-editor.ql-toolbar button:focus,\n' +
  '.ql-editor .ql-toolbar button:focus,\n' +
  '.ql-editor.ql-toolbar button.ql-active,\n' +
  '.ql-editor .ql-toolbar button.ql-active,\n' +
  '.ql-editor.ql-toolbar .ql-picker-label:hover,\n' +
  '.ql-editor .ql-toolbar .ql-picker-label:hover,\n' +
  '.ql-editor.ql-toolbar .ql-picker-label.ql-active,\n' +
  '.ql-editor .ql-toolbar .ql-picker-label.ql-active,\n' +
  '.ql-editor.ql-toolbar .ql-picker-item:hover,\n' +
  '.ql-editor .ql-toolbar .ql-picker-item:hover,\n' +
  '.ql-editor.ql-toolbar .ql-picker-item.ql-selected,\n' +
  '.ql-editor .ql-toolbar .ql-picker-item.ql-selected {\n' +
  '  color: #06c;\n' +
  '}\n' +
  '.ql-editor.ql-toolbar button:hover .ql-fill,\n' +
  '.ql-editor .ql-toolbar button:hover .ql-fill,\n' +
  '.ql-editor.ql-toolbar button:focus .ql-fill,\n' +
  '.ql-editor .ql-toolbar button:focus .ql-fill,\n' +
  '.ql-editor.ql-toolbar button.ql-active .ql-fill,\n' +
  '.ql-editor .ql-toolbar button.ql-active .ql-fill,\n' +
  '.ql-editor.ql-toolbar .ql-picker-label:hover .ql-fill,\n' +
  '.ql-editor .ql-toolbar .ql-picker-label:hover .ql-fill,\n' +
  '.ql-editor.ql-toolbar .ql-picker-label.ql-active .ql-fill,\n' +
  '.ql-editor .ql-toolbar .ql-picker-label.ql-active .ql-fill,\n' +
  '.ql-editor.ql-toolbar .ql-picker-item:hover .ql-fill,\n' +
  '.ql-editor .ql-toolbar .ql-picker-item:hover .ql-fill,\n' +
  '.ql-editor.ql-toolbar .ql-picker-item.ql-selected .ql-fill,\n' +
  '.ql-editor .ql-toolbar .ql-picker-item.ql-selected .ql-fill,\n' +
  '.ql-editor.ql-toolbar button:hover .ql-stroke.ql-fill,\n' +
  '.ql-editor .ql-toolbar button:hover .ql-stroke.ql-fill,\n' +
  '.ql-editor.ql-toolbar button:focus .ql-stroke.ql-fill,\n' +
  '.ql-editor .ql-toolbar button:focus .ql-stroke.ql-fill,\n' +
  '.ql-editor.ql-toolbar button.ql-active .ql-stroke.ql-fill,\n' +
  '.ql-editor .ql-toolbar button.ql-active .ql-stroke.ql-fill,\n' +
  '.ql-editor.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,\n' +
  '.ql-editor .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,\n' +
  '.ql-editor.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,\n' +
  '.ql-editor .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,\n' +
  '.ql-editor.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,\n' +
  '.ql-editor .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,\n' +
  '.ql-editor.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,\n' +
  '.ql-editor .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {\n' +
  '  fill: #06c;\n' +
  '}\n' +
  '.ql-editor.ql-toolbar button:hover .ql-stroke,\n' +
  '.ql-editor .ql-toolbar button:hover .ql-stroke,\n' +
  '.ql-editor.ql-toolbar button:focus .ql-stroke,\n' +
  '.ql-editor .ql-toolbar button:focus .ql-stroke,\n' +
  '.ql-editor.ql-toolbar button.ql-active .ql-stroke,\n' +
  '.ql-editor .ql-toolbar button.ql-active .ql-stroke,\n' +
  '.ql-editor.ql-toolbar .ql-picker-label:hover .ql-stroke,\n' +
  '.ql-editor .ql-toolbar .ql-picker-label:hover .ql-stroke,\n' +
  '.ql-editor.ql-toolbar .ql-picker-label.ql-active .ql-stroke,\n' +
  '.ql-editor .ql-toolbar .ql-picker-label.ql-active .ql-stroke,\n' +
  '.ql-editor.ql-toolbar .ql-picker-item:hover .ql-stroke,\n' +
  '.ql-editor .ql-toolbar .ql-picker-item:hover .ql-stroke,\n' +
  '.ql-editor.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,\n' +
  '.ql-editor .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,\n' +
  '.ql-editor.ql-toolbar button:hover .ql-stroke-miter,\n' +
  '.ql-editor .ql-toolbar button:hover .ql-stroke-miter,\n' +
  '.ql-editor.ql-toolbar button:focus .ql-stroke-miter,\n' +
  '.ql-editor .ql-toolbar button:focus .ql-stroke-miter,\n' +
  '.ql-editor.ql-toolbar button.ql-active .ql-stroke-miter,\n' +
  '.ql-editor .ql-toolbar button.ql-active .ql-stroke-miter,\n' +
  '.ql-editor.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,\n' +
  '.ql-editor .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,\n' +
  '.ql-editor.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,\n' +
  '.ql-editor .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,\n' +
  '.ql-editor.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,\n' +
  '.ql-editor .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,\n' +
  '.ql-editor.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,\n' +
  '.ql-editor .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {\n' +
  '  stroke: #06c;\n' +
  '}\n' +
  '@media (pointer: coarse) {\n' +
  '  .ql-editor.ql-toolbar button:hover:not(.ql-active),\n' +
  '  .ql-editor .ql-toolbar button:hover:not(.ql-active) {\n' +
  '    color: #444;\n' +
  '  }\n' +
  '  .ql-editor.ql-toolbar button:hover:not(.ql-active) .ql-fill,\n' +
  '  .ql-editor .ql-toolbar button:hover:not(.ql-active) .ql-fill,\n' +
  '  .ql-editor.ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill,\n' +
  '  .ql-editor .ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill {\n' +
  '    fill: #444;\n' +
  '  }\n' +
  '  .ql-editor.ql-toolbar button:hover:not(.ql-active) .ql-stroke,\n' +
  '  .ql-editor .ql-toolbar button:hover:not(.ql-active) .ql-stroke,\n' +
  '  .ql-editor.ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter,\n' +
  '  .ql-editor .ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter {\n' +
  '    stroke: #444;\n' +
  '  }\n' +
  '}\n' +
  '.ql-editor {\n' +
  '  box-sizing: border-box;\n' +
  '}\n' +
  '.ql-editor * {\n' +
  '  box-sizing: border-box;\n' +
  '}\n' +
  '.ql-editor .ql-hidden {\n' +
  '  display: none;\n' +
  '}\n' +
  '.ql-editor .ql-out-bottom,\n' +
  '.ql-editor .ql-out-top {\n' +
  '  visibility: hidden;\n' +
  '}\n' +
  '.ql-editor .ql-tooltip {\n' +
  '  position: absolute;\n' +
  '  transform: translateY(10px);\n' +
  '}\n' +
  '.ql-editor .ql-tooltip a {\n' +
  '  cursor: pointer;\n' +
  '  text-decoration: none;\n' +
  '}\n' +
  '.ql-editor .ql-tooltip.ql-flip {\n' +
  '  transform: translateY(-10px);\n' +
  '}\n' +
  '.ql-editor .ql-formats {\n' +
  '  display: inline-block;\n' +
  '  vertical-align: middle;\n' +
  '}\n' +
  '.ql-editor .ql-formats:after {\n' +
  '  clear: both;\n' +
  '  content: \'\';\n' +
  '  display: table;\n' +
  '}\n' +
  '.ql-editor .ql-stroke {\n' +
  '  fill: none;\n' +
  '  stroke: #444;\n' +
  '  stroke-linecap: round;\n' +
  '  stroke-linejoin: round;\n' +
  '  stroke-width: 2;\n' +
  '}\n' +
  '.ql-editor .ql-stroke-miter {\n' +
  '  fill: none;\n' +
  '  stroke: #444;\n' +
  '  stroke-miterlimit: 10;\n' +
  '  stroke-width: 2;\n' +
  '}\n' +
  '.ql-editor .ql-fill,\n' +
  '.ql-editor .ql-stroke.ql-fill {\n' +
  '  fill: #444;\n' +
  '}\n' +
  '.ql-editor .ql-empty {\n' +
  '  fill: none;\n' +
  '}\n' +
  '.ql-editor .ql-even {\n' +
  '  fill-rule: evenodd;\n' +
  '}\n' +
  '.ql-editor .ql-thin,\n' +
  '.ql-editor .ql-stroke.ql-thin {\n' +
  '  stroke-width: 1;\n' +
  '}\n' +
  '.ql-editor .ql-transparent {\n' +
  '  opacity: 0.4;\n' +
  '}\n' +
  '.ql-editor .ql-direction svg:last-child {\n' +
  '  display: none;\n' +
  '}\n' +
  '.ql-editor .ql-direction.ql-active svg:last-child {\n' +
  '  display: inline;\n' +
  '}\n' +
  '.ql-editor .ql-direction.ql-active svg:first-child {\n' +
  '  display: none;\n' +
  '}\n' +
  '.ql-editor h1 {\n' +
  '  font-size: 2em;\n' +
  '}\n' +
  '.ql-editor h2 {\n' +
  '  font-size: 1.5em;\n' +
  '}\n' +
  '.ql-editor h3 {\n' +
  '  font-size: 1.17em;\n' +
  '}\n' +
  '.ql-editor h4 {\n' +
  '  font-size: 1em;\n' +
  '}\n' +
  '.ql-editor h5 {\n' +
  '  font-size: 0.83em;\n' +
  '}\n' +
  '.ql-editor h6 {\n' +
  '  font-size: 0.67em;\n' +
  '}\n' +
  '.ql-editor a {\n' +
  '  text-decoration: underline;\n' +
  '}\n' +
  '.ql-editor blockquote {\n' +
  '  border-left: 4px solid #ccc;\n' +
  '  margin-bottom: 5px;\n' +
  '  margin-top: 5px;\n' +
  '  padding-left: 16px;\n' +
  '}\n' +
  '.ql-editor code,\n' +
  '.ql-editor pre {\n' +
  '  background-color: #f0f0f0;\n' +
  '  border-radius: 3px;\n' +
  '}\n' +
  '.ql-editor pre {\n' +
  '  white-space: pre-wrap;\n' +
  '  margin-bottom: 5px;\n' +
  '  margin-top: 5px;\n' +
  '  padding: 5px 10px;\n' +
  '}\n' +
  '.ql-editor code {\n' +
  '  font-size: 85%;\n' +
  '  padding: 2px 4px;\n' +
  '}\n' +
  '.ql-editor pre.ql-syntax {\n' +
  '  background-color: #23241f;\n' +
  '  color: #f8f8f2;\n' +
  '  overflow: visible;\n' +
  '}\n' +
  '.ql-editor img {\n' +
  '  max-width: 100%;\n' +
  '}\n' +
  '.ql-editor .ql-picker {\n' +
  '  color: #444;\n' +
  '  display: inline-block;\n' +
  '  float: left;\n' +
  '  font-size: 14px;\n' +
  '  font-weight: 500;\n' +
  '  height: 24px;\n' +
  '  position: relative;\n' +
  '  vertical-align: middle;\n' +
  '}\n' +
  '.ql-editor .ql-picker-label {\n' +
  '  cursor: pointer;\n' +
  '  display: inline-block;\n' +
  '  height: 100%;\n' +
  '  padding-left: 8px;\n' +
  '  padding-right: 2px;\n' +
  '  position: relative;\n' +
  '  width: 100%;\n' +
  '}\n' +
  '.ql-editor .ql-picker-label::before {\n' +
  '  display: inline-block;\n' +
  '  line-height: 22px;\n' +
  '}\n' +
  '.ql-editor .ql-picker-options {\n' +
  '  background-color: #fff;\n' +
  '  display: none;\n' +
  '  min-width: 100%;\n' +
  '  padding: 4px 8px;\n' +
  '  position: absolute;\n' +
  '  white-space: nowrap;\n' +
  '}\n' +
  '.ql-editor .ql-picker-options .ql-picker-item {\n' +
  '  cursor: pointer;\n' +
  '  display: block;\n' +
  '  padding-bottom: 5px;\n' +
  '  padding-top: 5px;\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-expanded .ql-picker-label {\n' +
  '  color: #ccc;\n' +
  '  z-index: 2;\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-expanded .ql-picker-label .ql-fill {\n' +
  '  fill: #ccc;\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-expanded .ql-picker-label .ql-stroke {\n' +
  '  stroke: #ccc;\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-expanded .ql-picker-options {\n' +
  '  display: block;\n' +
  '  margin-top: -1px;\n' +
  '  top: 100%;\n' +
  '  z-index: 1;\n' +
  '}\n' +
  '.ql-editor .ql-color-picker,\n' +
  '.ql-editor .ql-icon-picker {\n' +
  '  width: 28px;\n' +
  '}\n' +
  '.ql-editor .ql-color-picker .ql-picker-label,\n' +
  '.ql-editor .ql-icon-picker .ql-picker-label {\n' +
  '  padding: 2px 4px;\n' +
  '}\n' +
  '.ql-editor .ql-color-picker .ql-picker-label svg,\n' +
  '.ql-editor .ql-icon-picker .ql-picker-label svg {\n' +
  '  right: 4px;\n' +
  '}\n' +
  '.ql-editor .ql-icon-picker .ql-picker-options {\n' +
  '  padding: 4px 0px;\n' +
  '}\n' +
  '.ql-editor .ql-icon-picker .ql-picker-item {\n' +
  '  height: 24px;\n' +
  '  width: 24px;\n' +
  '  padding: 2px 4px;\n' +
  '}\n' +
  '.ql-editor .ql-color-picker .ql-picker-options {\n' +
  '  padding: 3px 5px;\n' +
  '  width: 152px;\n' +
  '}\n' +
  '.ql-editor .ql-color-picker .ql-picker-item {\n' +
  '  border: 1px solid transparent;\n' +
  '  float: left;\n' +
  '  height: 16px;\n' +
  '  margin: 2px;\n' +
  '  padding: 0px;\n' +
  '  width: 16px;\n' +
  '}\n' +
  '.ql-editor .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {\n' +
  '  position: absolute;\n' +
  '  margin-top: -9px;\n' +
  '  right: 0;\n' +
  '  top: 50%;\n' +
  '  width: 18px;\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-header .ql-picker-label[data-label]:not([data-label=\'\'])::before,\n' +
  '.ql-editor .ql-picker.ql-font .ql-picker-label[data-label]:not([data-label=\'\'])::before,\n' +
  '.ql-editor .ql-picker.ql-size .ql-picker-label[data-label]:not([data-label=\'\'])::before,\n' +
  '.ql-editor .ql-picker.ql-header .ql-picker-item[data-label]:not([data-label=\'\'])::before,\n' +
  '.ql-editor .ql-picker.ql-font .ql-picker-item[data-label]:not([data-label=\'\'])::before,\n' +
  '.ql-editor .ql-picker.ql-size .ql-picker-item[data-label]:not([data-label=\'\'])::before {\n' +
  '  content: attr(data-label);\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-header {\n' +
  '  width: 98px;\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-header .ql-picker-label::before,\n' +
  '.ql-editor .ql-picker.ql-header .ql-picker-item::before {\n' +
  '  content: \'Normal\';\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,\n' +
  '.ql-editor .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {\n' +
  '  content: \'Heading 1\';\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,\n' +
  '.ql-editor .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {\n' +
  '  content: \'Heading 2\';\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,\n' +
  '.ql-editor .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {\n' +
  '  content: \'Heading 3\';\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,\n' +
  '.ql-editor .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {\n' +
  '  content: \'Heading 4\';\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,\n' +
  '.ql-editor .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {\n' +
  '  content: \'Heading 5\';\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,\n' +
  '.ql-editor .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {\n' +
  '  content: \'Heading 6\';\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {\n' +
  '  font-size: 2em;\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {\n' +
  '  font-size: 1.5em;\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {\n' +
  '  font-size: 1.17em;\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {\n' +
  '  font-size: 1em;\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {\n' +
  '  font-size: 0.83em;\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {\n' +
  '  font-size: 0.67em;\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-font {\n' +
  '  width: 108px;\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-font .ql-picker-label::before,\n' +
  '.ql-editor .ql-picker.ql-font .ql-picker-item::before {\n' +
  '  content: \'Sans Serif\';\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,\n' +
  '.ql-editor .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {\n' +
  '  content: \'Serif\';\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,\n' +
  '.ql-editor .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {\n' +
  '  content: \'Monospace\';\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {\n' +
  '  font-family: Georgia, Times New Roman, serif;\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {\n' +
  '  font-family: Monaco, Courier New, monospace;\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-size {\n' +
  '  width: 98px;\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-size .ql-picker-label::before,\n' +
  '.ql-editor .ql-picker.ql-size .ql-picker-item::before {\n' +
  '  content: \'Normal\';\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-size .ql-picker-label[data-value=small]::before,\n' +
  '.ql-editor .ql-picker.ql-size .ql-picker-item[data-value=small]::before {\n' +
  '  content: \'Small\';\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-size .ql-picker-label[data-value=large]::before,\n' +
  '.ql-editor .ql-picker.ql-size .ql-picker-item[data-value=large]::before {\n' +
  '  content: \'Large\';\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,\n' +
  '.ql-editor .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {\n' +
  '  content: \'Huge\';\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-size .ql-picker-item[data-value=small]::before {\n' +
  '  font-size: 10px;\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-size .ql-picker-item[data-value=large]::before {\n' +
  '  font-size: 18px;\n' +
  '}\n' +
  '.ql-editor .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {\n' +
  '  font-size: 32px;\n' +
  '}\n' +
  '.ql-editor .ql-color-picker.ql-background .ql-picker-item {\n' +
  '  background-color: #fff;\n' +
  '}\n' +
  '.ql-editor .ql-color-picker.ql-color .ql-picker-item {\n' +
  '  background-color: #000;\n' +
  '}\n' +
  '.ql-toolbar.ql-editor {\n' +
  '  border: 1px solid #ccc;\n' +
  '  box-sizing: border-box;\n' +
  '  font-family: \'Helvetica Neue\', \'Helvetica\', \'Arial\', sans-serif;\n' +
  '  padding: 8px;\n' +
  '}\n' +
  '.ql-toolbar.ql-editor .ql-formats {\n' +
  '  margin-right: 15px;\n' +
  '}\n' +
  '.ql-toolbar.ql-editor .ql-picker-label {\n' +
  '  border: 1px solid transparent;\n' +
  '}\n' +
  '.ql-toolbar.ql-editor .ql-picker-options {\n' +
  '  border: 1px solid transparent;\n' +
  '  box-shadow: rgba(0,0,0,0.2) 0 2px 8px;\n' +
  '}\n' +
  '.ql-toolbar.ql-editor .ql-picker.ql-expanded .ql-picker-label {\n' +
  '  border-color: #ccc;\n' +
  '}\n' +
  '.ql-toolbar.ql-editor .ql-picker.ql-expanded .ql-picker-options {\n' +
  '  border-color: #ccc;\n' +
  '}\n' +
  '.ql-toolbar.ql-editor .ql-color-picker .ql-picker-item.ql-selected,\n' +
  '.ql-toolbar.ql-editor .ql-color-picker .ql-picker-item:hover {\n' +
  '  border-color: #000;\n' +
  '}\n' +
  '.ql-toolbar.ql-editor + .ql-container.ql-editor {\n' +
  '  border-top: 0px;\n' +
  '}\n' +
  '.ql-editor .ql-tooltip {\n' +
  '  background-color: #fff;\n' +
  '  border: 1px solid #ccc;\n' +
  '  box-shadow: 0px 0px 5px #ddd;\n' +
  '  color: #444;\n' +
  '  padding: 5px 12px;\n' +
  '  white-space: nowrap;\n' +
  '}\n' +
  '.ql-editor .ql-tooltip::before {\n' +
  '  content: "Visit URL:";\n' +
  '  line-height: 26px;\n' +
  '  margin-right: 8px;\n' +
  '}\n' +
  '.ql-editor .ql-tooltip input[type=text] {\n' +
  '  display: none;\n' +
  '  border: 1px solid #ccc;\n' +
  '  font-size: 13px;\n' +
  '  height: 26px;\n' +
  '  margin: 0px;\n' +
  '  padding: 3px 5px;\n' +
  '  width: 170px;\n' +
  '}\n' +
  '.ql-editor .ql-tooltip a.ql-preview {\n' +
  '  display: inline-block;\n' +
  '  max-width: 200px;\n' +
  '  overflow-x: hidden;\n' +
  '  text-overflow: ellipsis;\n' +
  '  vertical-align: top;\n' +
  '}\n' +
  '.ql-editor .ql-tooltip a.ql-action::after {\n' +
  '  border-right: 1px solid #ccc;\n' +
  '  content: \'Edit\';\n' +
  '  margin-left: 16px;\n' +
  '  padding-right: 8px;\n' +
  '}\n' +
  '.ql-editor .ql-tooltip a.ql-remove::before {\n' +
  '  content: \'Remove\';\n' +
  '  margin-left: 8px;\n' +
  '}\n' +
  '.ql-editor .ql-tooltip a {\n' +
  '  line-height: 26px;\n' +
  '}\n' +
  '.ql-editor .ql-tooltip.ql-editing a.ql-preview,\n' +
  '.ql-editor .ql-tooltip.ql-editing a.ql-remove {\n' +
  '  display: none;\n' +
  '}\n' +
  '.ql-editor .ql-tooltip.ql-editing input[type=text] {\n' +
  '  display: inline-block;\n' +
  '}\n' +
  '.ql-editor .ql-tooltip.ql-editing a.ql-action::after {\n' +
  '  border-right: 0px;\n' +
  '  content: \'Save\';\n' +
  '  padding-right: 0px;\n' +
  '}\n' +
  '.ql-editor .ql-tooltip[data-mode=link]::before {\n' +
  '  content: "Enter link:";\n' +
  '}\n' +
  '.ql-editor .ql-tooltip[data-mode=formula]::before {\n' +
  '  content: "Enter formula:";\n' +
  '}\n' +
  '.ql-editor .ql-tooltip[data-mode=video]::before {\n' +
  '  content: "Enter video:";\n' +
  '}\n' +
  '.ql-editor a {\n' +
  '  color: #06c;\n' +
  '}\n' +
  '.ql-container.ql-editor {\n' +
  '  border: 1px solid #ccc;\n' +
  '}\n</style>'


export default quillcss
