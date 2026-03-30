import request from '@/utils/request'

export default {
  upload,
  deleteFile,  
  downloadFile,
  downloadByPatientFileName,
  getProgressPercent
}

var nowProgressPercent = 0
/*
 * 文件上传-上传到public
 * @param file
 * @param tabName
 * @param relIds
 */
function upload(params) {
  const formData = new FormData()    
  Object.keys(params).forEach(key => {
    if (typeof (params[key]) === 'object') {
      Object.keys(params[key]).forEach(keys => {        
        formData.append('files', params[key][keys])
      })
    } else {
      formData.append(key, params[key])      
    }
  })  
  return request({
    url: '/common/minio/upload',
    method: 'post',
    data: formData,
    onUploadProgress: progressEvent => {
      nowProgressPercent = (progressEvent.loaded / progressEvent.total * 99 | 0)
    }
  })
}

function getProgressPercent() {
  return nowProgressPercent
}

function deleteFile(fileIds) {
  return request.delete(`/common/minio/deleteFile?ossFileIds=${fileIds}`)
}

// oss文件流下载oss-ykt
function downloadFile(id, fileSize) {
  return request({
    url: '/common/minio/downloadFile',
    method: 'post',
    data: { id: id },
    responseType: 'blob',
    onDownloadProgress(progress) {
      nowProgressPercent = Math.round(100 * progress.loaded / fileSize)
    }
  })  
}

/** 患者记录「文件名」字段：按名/标识直链下载（GET，blob） */
function downloadByPatientFileName(fileName) {
  return request({
    url: '/common/minio/downloadByPatientFileName',
    method: 'get',
    params: { fileName },
    responseType: 'blob',
    rawResponse: true
  })
}

