package com.apiagencia.service;

import java.io.IOException;
import java.net.ProxySelector;
import java.net.http.HttpResponse;
import java.nio.file.Path;
import java.text.ParseException;

import javax.servlet.annotation.MultipartConfig;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/image")
@RestController
@MultipartConfig
public class ImgurService {
 
    //private final String ENDPOINT  = "https://api.imgur.com/3/upload/json";
    private final String ENDPOINT  = "https://api.imgur.com/3/image";
    private final String CLIENT_ID = "a532c7c687b17fd";
    private static final HttpHeaders headers = new HttpHeaders();
    private static LinkedMultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
    private static HttpEntity<LinkedMultiValueMap<String, Object>> httpRequestEntity;
    private static ResponseImgur responseImgur;

    
    @PostMapping(value="/teste")
    public String uploadTeste(@RequestPart MultipartFile file) {
    	System.out.println(file);
    	String response = "Sucesso: " + file;
    	return response;
    }
    
    @PostMapping
    public ResponseEntity<String[]> upload(@RequestParam("file") MultipartFile file){
    	
    	
    	String[] imageData = new String[2];
    	
    	try {
    		if(!file.isEmpty()) {
    			    		
		    	headers.setContentType(MediaType.MULTIPART_FORM_DATA);
		    	headers.set("Authorization", "Client-ID " +CLIENT_ID);
		    	body.add("image", new MultipartInputStreamFileResource(file.getInputStream(), file.getOriginalFilename()));
		    	
		    	httpRequestEntity = new HttpEntity<>(body, headers);
		    	responseImgur = new RestTemplate().postForObject(ENDPOINT, httpRequestEntity, ResponseImgur.class);
		    	
		    	System.out.println(responseImgur);
		    	
		    	imageData[0] = responseImgur.data.link;
		    	imageData[1] = responseImgur.data.deletehash;
		    	
		    	return new ResponseEntity<String[]>(imageData, HttpStatus.OK);
    		}else {
    			throw new Error("Arquivo não subiu");
    		}
    	}catch(IOException e){
    		imageData[0] = "Error";
    		imageData[1] = imageData[0];
    		System.out.println("Error: " + e.getMessage() );
    		return new ResponseEntity<String[]>(imageData, HttpStatus.BAD_REQUEST);
    	}
    }
}