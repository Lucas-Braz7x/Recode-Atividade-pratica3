package com.apiagencia.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.apiagencia.repository.UsuarioRepository;
import com.apiagencia.service.JwtService;
import com.apiagencia.service.SecurityUserDetailsService;

@EnableWebSecurity
@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter{
	@Autowired
	private SecurityUserDetailsService userDetailsService;
	
	@Autowired
	private JwtService jwtService;
	
	@Bean
	public JwtTokenFilter jwtTokenFilter() {
		return new JwtTokenFilter(jwtService, userDetailsService);
	}
	
	//Autenticação de usuários
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {

		auth.userDetailsService(userDetailsService)
				.passwordEncoder(passwordEncoder());
		auth.inMemoryAuthentication();
	}
	
	//Definição de rotas públicas e privadas
	@Override
	protected void configure(HttpSecurity http) throws Exception {

		//O disable é referente a aplicação web
		http.csrf().disable().authorizeRequests()
				.antMatchers(HttpMethod.POST, "/usuario").permitAll()
				.antMatchers(HttpMethod.POST, "/usuario/login").permitAll()
				.antMatchers(HttpMethod.GET, "/usuario").permitAll()
				.antMatchers(HttpMethod.GET, "/passagem").permitAll()
				.antMatchers(HttpMethod.GET, "/viagem").permitAll()
				.anyRequest().authenticated()
				.and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)//Evita cookie e sempre precisa da autenticação
				.and()
				.addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
	}
	
	//Criptografia da senha
	@Bean //Diz que está no contexto do spring (Pode ser usado em qualquer lugar)
	public PasswordEncoder passwordEncoder() {
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		return encoder;
	}
	
	//Permissões de acesso
	//Configuração do "cors" com o spring securit
	@Bean
	public FilterRegistrationBean<CorsFilter> corsFilter(){
		List<String> all = Arrays.asList("*");
		List<String> allOrigins = Arrays.asList("/**", "http://localhost:3000", "https://passo-certo.netlify.app/");
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedMethods(all);//Permite todos os métodos
		config.setAllowedOrigins(allOrigins);//Permite as origins de acesso
		config.setAllowedHeaders(all);//Permite todos os headers
		config.setAllowCredentials(true);//Ativa as credênciais
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration( "/**", config);
		
		CorsFilter corsfilter = new CorsFilter(source);
		
		FilterRegistrationBean<CorsFilter> filter = 
				new FilterRegistrationBean<CorsFilter>(corsfilter);
		
		filter.setOrder(Ordered.HIGHEST_PRECEDENCE);//Maior procedência
		
		return filter;
	}
	
}
