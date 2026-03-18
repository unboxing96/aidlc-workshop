package com.tableorder.order;

import com.tableorder.auth.JwtAuthFilter;
import com.tableorder.auth.TableTokenFilter;
import com.tableorder.config.SecurityConfig;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tableorder.order.dto.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(value = OrderController.class,
    excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE,
        classes = {SecurityConfig.class, JwtAuthFilter.class, TableTokenFilter.class}))
@WithMockUser
class OrderControllerTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @MockBean private OrderService orderService;

    @Test
    void createOrder_성공() throws Exception {
        OrderResponse response = OrderResponse.builder()
                .id(1L).orderNumber("ORD-20260318-0001").tableId(1L).sessionId("s1")
                .totalAmount(18000).status("PENDING").items(List.of()).createdAt("2026-03-18T15:00:00").build();
        when(orderService.createOrder(any())).thenReturn(response);

        OrderCreateRequest request = new OrderCreateRequest(1L, List.of(new OrderItemRequest(1L, 2)));

        mockMvc.perform(post("/api/orders")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.orderNumber").value("ORD-20260318-0001"));
    }

    @Test
    void createOrder_빈항목_400() throws Exception {
        OrderCreateRequest request = new OrderCreateRequest(1L, List.of());

        mockMvc.perform(post("/api/orders")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void getOrdersByTable_성공() throws Exception {
        Page<OrderResponse> page = new PageImpl<>(List.of());
        when(orderService.getOrdersByTable(eq(1L), anyInt(), anyInt())).thenReturn(page);

        mockMvc.perform(get("/api/orders/table/1"))
                .andExpect(status().isOk());
    }
}
