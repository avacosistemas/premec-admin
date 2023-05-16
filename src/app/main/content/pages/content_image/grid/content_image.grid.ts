export const CONTENT_IMAGE_GRID_DEF = {
  columnsDef: [
    {
      columnDef: 'id',
      id: true,
      columnNameKey: 'content_image_grid_def_column_id'
    },
    {
      columnDef: 'contentId',
      columnNameKey: 'content_image_grid_def_column_contentid'
    },
    {
      columnDef: 'imageId',
      columnNameKey: 'content_image_grid_def_column_imageid'
    },
    {
      columnDef: 'imageName',
      columnNameKey: 'content_image_grid_def_column_imageid'
    },
    {
      columnDef: 'typeId',
      columnNameKey: 'content_image_grid_def_column_typeid'
    },
    {
      columnDef: 'typeIdString',
      columnNameKey: 'content_image_grid_def_column_typeidString'
    },
    {
      columnDef: 'imageOrder',
      columnNameKey: 'content_image_grid_def_column_imageOrder'
    }
  ],
  sortAllColumns: true,
  displayedColumns: [
    'imageName',
    'typeIdString',
    'imageOrder'
  ],
  deleteAction: true
};
